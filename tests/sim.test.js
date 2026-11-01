import { describe, it, expect } from 'vitest';
import { step } from '../src/sim/step.js';
import { createMatch } from '../src/sim/state.js';
import { createRng } from '../src/sim/rng.js';
import { SUB, ROUND_FRAMES, INTRO_FRAMES } from '../src/sim/constants.js';
import { LEFT, RIGHT, DOWN, UP, LIGHT, HEAVY, SPECIAL, THROW } from '../src/sim/input.js';
import lal from '../src/data/fighters/dummy-lal.json';
import neela from '../src/data/fighters/dummy-neela.json';

const defs = [lal, neela];

// A match that's already past the round intro, with the fighters `gap` pixels apart.
function fight(gap = 100) {
  let s = createMatch(defs);
  for (let i = 0; i < INTRO_FRAMES; i++) s = step(s, [0, 0], defs);
  s.fighters[0].x = 600 * SUB;
  s.fighters[1].x = (600 + gap) * SUB;
  return s;
}

// Runs n frames. `p1`/`p2` are either a fixed input or a function of the frame number.
function run(s, n, p1 = 0, p2 = 0) {
  for (let i = 0; i < n; i++) {
    const a = typeof p1 === 'function' ? p1(i) : p1;
    const b = typeof p2 === 'function' ? p2(i) : p2;
    s = step(s, [a, b], defs);
  }
  return s;
}

const tap =
  (bits, extra = 0) =>
  (i) =>
    i === 0 ? bits | extra : extra;

describe('fight simulation', () => {
  it('is deterministic: same inputs, same fight', () => {
    const play = () => {
      const rng = createRng(42);
      const all = [UP, DOWN, LEFT, RIGHT, LIGHT, HEAVY, SPECIAL, THROW];
      const rand = () => all.filter(() => rng() < 0.2).reduce((a, b) => a | b, 0);
      let s = createMatch(defs);
      for (let i = 0; i < 3000; i++) s = step(s, [rand(), rand()], defs);
      return s;
    };
    expect(play()).toEqual(play());
  });

  it('a light attack hits a standing opponent', () => {
    const s = run(fight(), 20, tap(LIGHT));
    expect(s.fighters[1].health).toBe(neela.health - lal.moves.light.hit.damage);
  });

  it('holding back blocks a light attack', () => {
    const s = run(fight(), 20, tap(LIGHT), RIGHT);
    expect(s.fighters[1].health).toBe(neela.health);
  });

  it('a low has to be blocked crouching', () => {
    const standing = run(fight(), 20, tap(LIGHT, DOWN), RIGHT);
    expect(standing.fighters[1].health).toBeLessThan(neela.health);
    const crouching = run(fight(), 20, tap(LIGHT, DOWN), RIGHT | DOWN);
    expect(crouching.fighters[1].health).toBe(neela.health);
  });

  it('a throw beats blocking', () => {
    const s = run(fight(95), 20, tap(THROW), RIGHT);
    expect(s.fighters[1].health).toBe(neela.health - lal.moves.throw.hit.damage);
  });

  it('pressing throw at the same time escapes it', () => {
    const s = run(fight(95), 20, tap(THROW), tap(THROW));
    expect(s.fighters[0].health).toBe(lal.health);
    expect(s.fighters[1].health).toBe(neela.health);
  });

  it('projectiles cancel each other out', () => {
    const s = run(fight(800), 120, tap(SPECIAL), tap(SPECIAL));
    expect(s.projectiles).toHaveLength(0);
    expect(s.fighters[0].health).toBe(lal.health);
    expect(s.fighters[1].health).toBe(neela.health);
  });

  it('combo damage scales down', () => {
    // light, light, heavy as a chain
    const s = run(fight(), 60, (i) => ([0, 8, 16].includes(i) ? (i === 16 ? HEAVY : LIGHT) : 0));
    const raw = 2 * lal.moves.light.hit.damage + lal.moves.heavy.hit.damage;
    expect(s.fighters[1].health).toBeGreaterThan(neela.health - raw);
    expect(s.fighters[1].health).toBeLessThan(neela.health - lal.moves.light.hit.damage);
  });

  it('time-out goes to whoever has more health', () => {
    let s = fight(400);
    s.fighters[1].health -= 1;
    s = run(s, ROUND_FRAMES);
    expect(s.result).toEqual({ winner: 0, reason: 'timeout' });
    expect(s.wins).toEqual([1, 0]);
  });

  it('two round wins take the match', () => {
    let s = fight(400);
    for (let round = 0; round < 2; round++) {
      s.fighters[1].health = 1;
      s.fighters[0].x = 600 * SUB;
      s.fighters[1].x = 700 * SUB;
      s = run(s, 20, tap(LIGHT));
      s = run(s, 400);
    }
    expect(s.phase).toBe('over');
    expect(s.matchWinner).toBe(0);
  });
});
