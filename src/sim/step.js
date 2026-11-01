// The whole fight, one frame at a time: step(state, inputs, defs) → next state.
// Deterministic: same state + same inputs always gives the same result, on any device.
// No Math.random(), no clocks, no floating-point positions.
import {
  SUB,
  STAGE_WIDTH,
  ROUND_FRAMES,
  INTRO_FRAMES,
  KO_FRAMES,
  ROUNDS_TO_WIN,
  BUFFER_FRAMES,
  KNOCKDOWN_FRAMES,
  TECH_FRAMES,
  COMBO_SCALE_STEP,
  MIN_COMBO_SCALE,
} from './constants.js';
import { UP, DOWN, LEFT, RIGHT, BLOCK, BUTTONS } from './input.js';
import { createFighter } from './state.js';
import { overlaps, hurtbox, hitbox, projectileBox } from './collision.js';

const NEUTRAL = ['idle', 'walk', 'crouch'];
const CANT_BE_THROWN = ['hitstun', 'blockstun', 'airhit', 'knockdown', 'tech'];

export function step(prev, inputs, defs) {
  const s = structuredClone(prev);
  s.frame++;

  const fighting = s.phase === 'fight' && s.hitstop === 0;
  s.fighters.forEach((f, i) => updateBuffer(f, inputs[i], fighting));

  if (s.phase === 'intro') {
    if (--s.phaseTimer <= 0) s.phase = 'fight';
  } else if (s.phase === 'ko') {
    if (--s.phaseTimer <= 0) nextRound(s, defs);
  } else if (s.phase === 'fight') {
    if (s.hitstop > 0) {
      s.hitstop--;
    } else {
      s.fighters.forEach((f, i) => control(s, i, inputs[i], defs[i]));
      s.fighters.forEach((f, i) => physics(f, defs[i]));
      pushApart(s, defs);
      faceEachOther(s);
      moveProjectiles(s);
      resolveHits(s, inputs, defs);
      s.timer--;
      checkRoundEnd(s, defs);
    }
  }

  s.fighters.forEach((f, i) => (f.prev = inputs[i]));
  return s;
}

// ---------- input ----------

function updateBuffer(f, input, decay) {
  for (const [name, bit] of Object.entries(BUTTONS)) {
    if (input & bit && !(f.prev & bit)) f.buffer[name] = BUFFER_FRAMES;
    else if (decay && f.buffer[name] > 0) f.buffer[name]--;
  }
}

function forwardHeld(f, input) {
  return f.facing === 1 ? !!(input & RIGHT) : !!(input & LEFT);
}

function backHeld(f, input) {
  return f.facing === 1 ? !!(input & LEFT) : !!(input & RIGHT);
}

const category = (id) =>
  ({
    crouchLight: 'light',
    crouchHeavy: 'heavy',
    forwardSpecial: 'special',
    backSpecial: 'special',
  })[id] ?? id;

// Picks the next move from buffered presses. `allowed` limits it to cancel options.
function pickAction(s, i, f, input, allowed) {
  const ok = (id) => !allowed || allowed.includes(category(id));
  const take = (button, id) => {
    if (!f.buffer[button] || !ok(id)) return null;
    f.buffer[button] = 0;
    return id;
  };
  if (f.buffer.throw && ok('throw')) return take('throw', 'throw');
  if (f.buffer.special) {
    let id = 'special';
    if (forwardHeld(f, input)) id = 'forwardSpecial';
    else if (backHeld(f, input)) id = 'backSpecial';
    else if (s.projectiles.some((p) => p.owner === i)) id = null; // one projectile at a time
    if (id) return take('special', id);
  }
  const low = !!(input & DOWN);
  return (
    take('heavy', low ? 'crouchHeavy' : 'heavy') ?? take('light', low ? 'crouchLight' : 'light')
  );
}

// ---------- per-fighter control ----------

const totalFrames = (m) => m.startup + (m.active ?? 0) + m.recovery;
export const isActive = (f, m) => f.frame > m.startup && f.frame <= m.startup + (m.active ?? 0);

function startMove(f, id) {
  f.state = 'attack';
  f.move = id;
  f.frame = 0;
  f.hasHit = false;
  if (f.y === 0) f.vx = 0;
}

function friction(f) {
  f.vx -= Math.trunc(f.vx / 6);
  if (Math.abs(f.vx) < 10) f.vx = 0;
}

function control(s, i, input, def) {
  const f = s.fighters[i];
  f.crouching = false;

  switch (f.state) {
    case 'hitstun':
    case 'blockstun':
    case 'tech':
      f.crouching = f.state === 'blockstun' && !!(input & DOWN);
      if (f.y === 0) friction(f);
      if (--f.stun <= 0) {
        if (f.state === 'hitstun') f.combo = 0;
        f.state = 'idle';
      }
      return;

    case 'airhit':
      return; // physics() turns this into a knockdown on landing

    case 'knockdown':
      friction(f);
      if (++f.frame >= KNOCKDOWN_FRAMES) {
        f.state = 'idle';
        f.frame = 0;
        f.combo = 0;
      }
      return;

    case 'attack': {
      const m = def.moves[f.move];
      f.frame++;
      f.crouching = !!m.crouching;
      if (m.dash) f.vx = f.frame <= m.startup + (m.active ?? 0) ? f.facing * m.dash : 0;
      if (m.rise && f.frame === m.startup) f.vy = m.rise;
      if (m.projectile && f.frame === m.startup) spawnProjectile(s, i, m.projectile);
      if (f.hasHit && m.cancel && f.frame > m.startup) {
        const next = pickAction(s, i, f, input, m.cancel);
        if (next) return startMove(f, next);
      }
      if (f.frame >= totalFrames(m)) {
        f.move = null;
        f.frame = 0;
        f.state = f.y > 0 ? 'jump' : 'idle';
        if (f.state === 'jump') f.airAttackUsed = true;
        else f.vx = 0;
      }
      return;
    }

    case 'jump':
      if (!f.airAttackUsed && (f.buffer.light || f.buffer.heavy)) {
        f.buffer.light = f.buffer.heavy = 0;
        f.airAttackUsed = true;
        f.state = 'attack';
        f.move = 'jumpAttack';
        f.frame = 0;
        f.hasHit = false;
      }
      return;

    default: {
      // idle, walk, crouch: free to act
      const action = pickAction(s, i, f, input, null);
      if (action) return startMove(f, action);
      if (input & UP) {
        f.state = 'jump';
        f.vy = def.jumpVelocity;
        f.vx = forwardHeld(f, input)
          ? f.facing * def.jumpForward
          : backHeld(f, input)
            ? -f.facing * def.jumpForward
            : 0;
      } else if (input & DOWN) {
        f.state = 'crouch';
        f.crouching = true;
        f.vx = 0;
      } else if (forwardHeld(f, input)) {
        f.state = 'walk';
        f.vx = f.facing * def.walkSpeed;
      } else if (backHeld(f, input)) {
        f.state = 'walk';
        f.vx = -f.facing * def.backWalkSpeed;
      } else {
        f.state = 'idle';
        f.vx = 0;
      }
    }
  }
}

// ---------- movement ----------

function physics(f, def) {
  if (f.y > 0 || f.vy > 0) {
    f.vy -= def.gravity;
    f.y += f.vy;
    if (f.y <= 0) {
      f.y = 0;
      f.vy = 0;
      land(f);
    }
  }
  f.x += f.vx;
  clampToStage(f, def);
}

function land(f) {
  f.airAttackUsed = false;
  if (f.state === 'jump' || (f.state === 'attack' && f.move === 'jumpAttack')) {
    f.state = 'idle';
    f.move = null;
    f.frame = 0;
    f.vx = 0;
  } else if (f.state === 'airhit') {
    f.state = 'knockdown';
    f.frame = 0;
  } else if (f.state === 'attack') {
    f.vx = 0;
  }
}

function clampToStage(f, def) {
  const half = (def.width * SUB) / 2;
  f.x = Math.max(half, Math.min(STAGE_WIDTH - half, f.x));
}

function pushApart(s, defs) {
  const [a, b] = s.fighters;
  const ha = hurtbox(a, defs[0]);
  const hb = hurtbox(b, defs[1]);
  if (!overlaps(ha, hb)) return;
  const dir = a.x < b.x ? 1 : a.x > b.x ? -1 : a.facing;
  const overlap = (defs[0].width * SUB + defs[1].width * SUB) / 2 - Math.abs(a.x - b.x);
  const half = Math.trunc(overlap / 2);
  a.x -= dir * half;
  b.x += dir * (overlap - half);
  clampToStage(a, defs[0]);
  clampToStage(b, defs[1]);
  // If one is against a wall, the other takes the rest of the push.
  const left = (defs[0].width * SUB + defs[1].width * SUB) / 2 - Math.abs(a.x - b.x);
  if (left > 0) {
    if (a.x === (defs[0].width * SUB) / 2 || a.x === STAGE_WIDTH - (defs[0].width * SUB) / 2)
      b.x += dir * left;
    else a.x -= dir * left;
    clampToStage(a, defs[0]);
    clampToStage(b, defs[1]);
  }
}

function faceEachOther(s) {
  s.fighters.forEach((f, i) => {
    const opp = s.fighters[1 - i];
    if (f.y === 0 && NEUTRAL.includes(f.state) && opp.x !== f.x) f.facing = opp.x > f.x ? 1 : -1;
  });
}

// ---------- projectiles ----------

function spawnProjectile(s, i, p) {
  const f = s.fighters[i];
  s.projectiles.push({
    owner: i,
    x: f.x + f.facing * p.offset * SUB,
    y: p.y * SUB,
    vx: f.facing * p.speed,
    w: p.w * SUB,
    h: p.h * SUB,
    hit: p.hit,
  });
}

function moveProjectiles(s) {
  for (const p of s.projectiles) p.x += p.vx;
  s.projectiles = s.projectiles.filter((p) => p.x > -p.w && p.x < STAGE_WIDTH + p.w);
}

// ---------- hits ----------

function isInvulnerable(f, def) {
  if (f.state === 'knockdown' || f.state === 'airhit') return true;
  const m = f.state === 'attack' && def.moves[f.move];
  return !!(m && m.invincible && f.frame <= m.invincible);
}

function isBlocking(f, input, dirAway, height) {
  if (f.y > 0 || !(NEUTRAL.includes(f.state) || f.state === 'blockstun')) return false;
  const holdingAway = input & BLOCK || (dirAway === 1 ? input & RIGHT : input & LEFT);
  if (!holdingAway) return false;
  const crouching = !!(input & DOWN);
  if (height === 'low') return crouching;
  if (height === 'high') return !crouching;
  return true;
}

function resolveHits(s, inputs, defs) {
  const hits = [];
  const throws = [];

  s.fighters.forEach((f, i) => {
    if (f.state !== 'attack' || f.hasHit) return;
    const m = defs[i].moves[f.move];
    if (!isActive(f, m)) return;
    const opp = s.fighters[1 - i];
    if (m.type === 'throw') {
      const gap = Math.abs(opp.x - f.x) - ((defs[0].width + defs[1].width) * SUB) / 2;
      if (
        opp.y === 0 &&
        !CANT_BE_THROWN.includes(opp.state) &&
        !isInvulnerable(opp, defs[1 - i]) &&
        gap <= m.range * SUB
      )
        throws.push(i);
    } else if (
      m.hit &&
      !isInvulnerable(opp, defs[1 - i]) &&
      overlaps(hitbox(f, m.hitbox), hurtbox(opp, defs[1 - i]))
    ) {
      hits.push({
        attacker: i,
        hit: m.hit,
        dirAway: f.x < opp.x ? 1 : f.x > opp.x ? -1 : f.facing,
      });
    }
  });

  // Projectiles cancel each other out, otherwise they hit the other fighter.
  const gone = new Set();
  s.projectiles.forEach((p, a) =>
    s.projectiles.forEach((q, b) => {
      if (a < b && p.owner !== q.owner && overlaps(projectileBox(p), projectileBox(q))) {
        gone.add(a);
        gone.add(b);
      }
    }),
  );
  s.projectiles.forEach((p, k) => {
    if (gone.has(k)) return;
    const target = 1 - p.owner;
    const opp = s.fighters[target];
    if (
      !isInvulnerable(opp, defs[target]) &&
      overlaps(projectileBox(p), hurtbox(opp, defs[target]))
    ) {
      hits.push({ attacker: p.owner, hit: p.hit, dirAway: Math.sign(p.vx), projectile: true });
      gone.add(k);
    }
  });
  s.projectiles = s.projectiles.filter((p, k) => !gone.has(k));

  // Apply after collecting, so two attacks landing on the same frame both count (a trade).
  for (const h of hits) applyHit(s, h, inputs[1 - h.attacker]);

  if (throws.length === 2) {
    techThrow(s);
  } else if (throws.length === 1) {
    const i = throws[0];
    const thrower = s.fighters[i];
    const opp = s.fighters[1 - i];
    thrower.hasHit = true;
    if (opp.buffer.throw) {
      opp.buffer.throw = 0;
      techThrow(s);
    } else {
      const m = defs[i].moves.throw;
      opp.health -= m.hit.damage;
      launch(opp, thrower.x < opp.x ? 1 : -1);
      s.hitstop = Math.max(s.hitstop, m.hit.hitstop);
    }
  }
}

function applyHit(s, { attacker, hit, dirAway, projectile }, defenderInput) {
  const a = s.fighters[attacker];
  const d = s.fighters[1 - attacker];
  if (!projectile) a.hasHit = true;

  if (isBlocking(d, defenderInput, dirAway, hit.height ?? 'mid')) {
    d.health -= hit.chip ?? 0;
    d.state = 'blockstun';
    d.stun = hit.blockstun;
    d.vx = dirAway * hit.pushback;
    s.hitstop = Math.max(s.hitstop, hit.hitstop - 2);
    return;
  }

  d.combo++;
  const scale = Math.max(MIN_COMBO_SCALE, 100 - COMBO_SCALE_STEP * (d.combo - 1));
  d.health -= Math.trunc((hit.damage * scale) / 100);
  d.move = null;
  d.frame = 0;
  if (d.y > 0 || hit.knockdown) {
    launch(d, dirAway);
  } else {
    d.state = 'hitstun';
    d.stun = hit.hitstun;
    d.vx = dirAway * hit.pushback;
  }
  s.hitstop = Math.max(s.hitstop, hit.hitstop);
}

function launch(f, dirAway) {
  f.state = 'airhit';
  f.move = null;
  f.frame = 0;
  f.vy = 1000;
  f.vx = dirAway * 350;
}

function techThrow(s) {
  const [a, b] = s.fighters;
  const dir = a.x < b.x ? 1 : -1;
  for (const [f, d] of [
    [a, -dir],
    [b, dir],
  ]) {
    f.state = 'tech';
    f.stun = TECH_FRAMES;
    f.move = null;
    f.frame = 0;
    f.hasHit = true;
    f.vx = d * 800;
  }
}

// ---------- rounds ----------

function checkRoundEnd(s, defs) {
  const [a, b] = s.fighters;
  const ko = a.health <= 0 || b.health <= 0;
  if (!ko && s.timer > 0) return;

  let winner;
  if (ko) winner = a.health <= 0 && b.health <= 0 ? -1 : a.health <= 0 ? 1 : 0;
  else {
    // Compare health as a share of each fighter's max, without decimals.
    const pa = a.health * defs[1].health;
    const pb = b.health * defs[0].health;
    winner = pa === pb ? -1 : pa > pb ? 0 : 1;
  }

  if (winner === -1) {
    s.wins[0]++;
    s.wins[1]++;
  } else {
    s.wins[winner]++;
  }
  a.health = Math.max(0, a.health);
  b.health = Math.max(0, b.health);
  s.result = { winner, reason: ko ? 'ko' : 'timeout' };
  s.phase = 'ko';
  s.phaseTimer = KO_FRAMES;
}

function nextRound(s, defs) {
  if (s.wins[0] >= ROUNDS_TO_WIN || s.wins[1] >= ROUNDS_TO_WIN) {
    s.phase = 'over';
    s.matchWinner = s.wins[0] === s.wins[1] ? -1 : s.wins[0] > s.wins[1] ? 0 : 1;
    return;
  }
  s.round++;
  s.fighters = defs.map((def, i) => createFighter(def, i));
  s.projectiles = [];
  s.timer = ROUND_FRAMES;
  s.hitstop = 0;
  s.result = null;
  s.phase = 'intro';
  s.phaseTimer = INTRO_FRAMES;
}
