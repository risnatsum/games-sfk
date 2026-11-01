import { SUB } from '../sim/constants.js';
import { UP, DOWN, LEFT, RIGHT, LIGHT, HEAVY, SPECIAL, THROW } from '../sim/input.js';
import { createRng } from '../sim/rng.js';

// Difficulty sets how often it reacts and how often it gets the reaction right (DECISIONS 2.6).
const LEVELS = {
  easy: { reaction: 22, skill: 0.3 },
  normal: { reaction: 13, skill: 0.55 },
  hard: { reaction: 7, skill: 0.8 },
};

// Simple rule-based opponent. It reads the fight state and returns an input bitmask each frame.
export class Cpu {
  constructor(index, level = 'normal', seed = 7) {
    this.index = index;
    this.level = LEVELS[level];
    this.rand = createRng(seed);
    this.wait = 0;
    this.hold = 0;
  }

  next(s) {
    if (s.phase !== 'fight') {
      this.wait = 0;
      this.hold = 0;
      return 0;
    }
    if (this.wait > 0) {
      this.wait--;
      return this.hold;
    }
    this.wait = this.level.reaction;
    const tap = this.decide(s);
    return this.hold | tap; // buttons are pressed for one frame only
  }

  decide(s) {
    const me = s.fighters[this.index];
    const opp = s.fighters[1 - this.index];
    const r = this.rand();
    const { skill } = this.level;
    const dist = Math.abs(opp.x - me.x) / SUB;
    const toward = opp.x >= me.x ? RIGHT : LEFT;
    const away = toward === RIGHT ? LEFT : RIGHT;
    this.hold = 0;

    const incoming = s.projectiles.find(
      (p) =>
        p.owner !== this.index &&
        Math.sign(p.vx) === Math.sign(me.x - p.x) &&
        Math.abs(p.x - me.x) / SUB < 350,
    );
    if (incoming && r < skill) {
      this.hold = r < skill / 2 ? UP | toward : away;
      return 0;
    }
    if (opp.y > 0 && dist < 220 && r < skill * 0.8) {
      this.hold = away;
      return SPECIAL; // back + Special: anti-air
    }
    if (opp.state === 'attack' && dist < 230 && r < skill) {
      const low = opp.move === 'crouchLight' || opp.move === 'crouchHeavy';
      this.hold = away | (low ? DOWN : 0);
      return 0;
    }

    const k = this.rand();
    if (dist > 480) {
      if (k < 0.35 && !s.projectiles.some((p) => p.owner === this.index)) return SPECIAL;
      this.hold = toward;
      return 0;
    }
    if (dist > 170) {
      this.hold = toward;
      if (k < 0.12) return SPECIAL; // forward + Special
      if (k < 0.22) this.hold = UP | toward;
      return 0;
    }
    if (k < 0.3) return LIGHT;
    if (k < 0.45) {
      this.hold = DOWN;
      return LIGHT;
    }
    if (k < 0.62) return HEAVY;
    if (k < 0.74) return THROW;
    if (k < 0.84) {
      this.hold = DOWN;
      return HEAVY;
    }
    this.hold = away;
    return 0;
  }
}
