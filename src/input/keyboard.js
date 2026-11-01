import Phaser from 'phaser';
import { UP, DOWN, LEFT, RIGHT, LIGHT, HEAVY, SPECIAL, THROW } from '../sim/input.js';

const K = Phaser.Input.Keyboard.KeyCodes;

// Layouts from PRD §4.2. Throw is Light + Heavy together.
const LAYOUTS = [
  { up: K.W, down: K.S, left: K.A, right: K.D, light: K.F, heavy: K.G, special: K.H },
  {
    up: K.UP,
    down: K.DOWN,
    left: K.LEFT,
    right: K.RIGHT,
    light: K.K,
    heavy: K.L,
    special: K.SEMICOLON,
  },
];

export class KeyboardInput {
  constructor(scene) {
    this.players = LAYOUTS.map((layout) => scene.input.keyboard.addKeys(layout, false));
  }

  read(player) {
    const k = this.players[player];
    let bits = 0;
    if (k.up.isDown) bits |= UP;
    if (k.down.isDown) bits |= DOWN;
    if (k.left.isDown) bits |= LEFT;
    if (k.right.isDown) bits |= RIGHT;
    if (k.special.isDown) bits |= SPECIAL;
    if (k.light.isDown && k.heavy.isDown) bits |= THROW;
    else {
      if (k.light.isDown) bits |= LIGHT;
      if (k.heavy.isDown) bits |= HEAVY;
    }
    return bits;
  }
}
