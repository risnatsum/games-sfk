import { STAGE_WIDTH, ROUND_FRAMES, INTRO_FRAMES } from './constants.js';

export function createFighter(def, side) {
  return {
    x: side === 0 ? (STAGE_WIDTH * 35) / 100 : (STAGE_WIDTH * 65) / 100,
    y: 0, // height above the floor
    vx: 0,
    vy: 0,
    facing: side === 0 ? 1 : -1,
    health: def.health,
    state: 'idle', // idle | walk | crouch | jump | attack | hitstun | blockstun | airhit | knockdown | tech
    frame: 0, // frames spent in the current move or knockdown
    move: null,
    hasHit: false,
    stun: 0,
    combo: 0, // hits taken in the current combo
    airAttackUsed: false,
    crouching: false,
    prev: 0, // last frame's input, for spotting new presses
    buffer: { light: 0, heavy: 0, special: 0, throw: 0 },
  };
}

export function createMatch(defs) {
  return {
    frame: 0,
    round: 1,
    wins: [0, 0],
    phase: 'intro', // intro | fight | ko | over
    phaseTimer: INTRO_FRAMES,
    timer: ROUND_FRAMES,
    hitstop: 0,
    result: null, // { winner: 0 | 1 | -1, reason: 'ko' | 'timeout' }
    matchWinner: null,
    fighters: defs.map((def, i) => createFighter(def, i)),
    projectiles: [],
  };
}
