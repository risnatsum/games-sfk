import { UP, DOWN, LEFT, RIGHT, LIGHT, HEAVY, SPECIAL, THROW, BLOCK } from '../sim/input.js';

const STICK_RADIUS = 70;
const DEAD_ZONE = 22;
const BUTTON_RADIUS = 46;

// Right-thumb buttons, laid out as in PRD §4.2. Block is the touch-only option from DECISIONS 2.3.
const BUTTONS = [
  { label: 'H', bit: HEAVY, x: 1035, y: 515 },
  { label: 'S', bit: SPECIAL, x: 1145, y: 515 },
  { label: 'L', bit: LIGHT, x: 985, y: 625 },
  { label: 'T', bit: THROW, x: 1095, y: 625 },
  { label: 'B', bit: BLOCK, x: 1205, y: 625 },
];

// A floating joystick (appears wherever the left thumb lands) plus buttons on the right.
export class TouchControls {
  constructor(scene) {
    this.scene = scene;
    this.stick = null; // { id, ox, oy, x, y }
    this.held = new Map(); // pointer id → button
    this.graphics = scene.add.graphics().setDepth(100);
    this.labels = BUTTONS.map((b) =>
      scene.add
        .text(b.x, b.y, b.label, { fontFamily: 'system-ui', fontSize: '30px', color: '#ffffff' })
        .setOrigin(0.5)
        .setAlpha(0.8)
        .setDepth(101),
    );
    scene.input.addPointer(4);
    scene.input.on('pointerdown', this.down, this);
    scene.input.on('pointermove', this.move, this);
    scene.input.on('pointerup', this.up, this);
    scene.input.on('pointerupoutside', this.up, this);
  }

  down(p) {
    if (p.x < 640) {
      this.stick = { id: p.id, ox: p.x, oy: p.y, x: p.x, y: p.y };
      return;
    }
    const b = BUTTONS.find((b) => (p.x - b.x) ** 2 + (p.y - b.y) ** 2 < (BUTTON_RADIUS + 12) ** 2);
    if (b) {
      this.held.set(p.id, b);
      if (navigator.vibrate) navigator.vibrate(8);
    }
  }

  move(p) {
    if (this.stick && p.id === this.stick.id) {
      this.stick.x = p.x;
      this.stick.y = p.y;
    }
  }

  up(p) {
    if (this.stick && p.id === this.stick.id) this.stick = null;
    this.held.delete(p.id);
  }

  read() {
    let bits = 0;
    for (const b of this.held.values()) bits |= b.bit;
    if (this.stick) {
      const dx = this.stick.x - this.stick.ox;
      const dy = this.stick.y - this.stick.oy;
      if (dx < -DEAD_ZONE) bits |= LEFT;
      if (dx > DEAD_ZONE) bits |= RIGHT;
      if (dy < -DEAD_ZONE * 1.5) bits |= UP;
      if (dy > DEAD_ZONE * 1.5) bits |= DOWN;
    }
    return bits;
  }

  draw() {
    const g = this.graphics.clear();
    const pressed = new Set(this.held.values());
    for (const b of BUTTONS) {
      g.fillStyle(0xffffff, pressed.has(b) ? 0.45 : 0.15);
      g.fillCircle(b.x, b.y, BUTTON_RADIUS);
      g.lineStyle(3, 0xffffff, 0.5);
      g.strokeCircle(b.x, b.y, BUTTON_RADIUS);
    }
    if (this.stick) {
      const { ox, oy, x, y } = this.stick;
      const d = Math.hypot(x - ox, y - oy);
      const k = d > STICK_RADIUS ? STICK_RADIUS / d : 1;
      g.fillStyle(0xffffff, 0.12);
      g.fillCircle(ox, oy, STICK_RADIUS);
      g.fillStyle(0xffffff, 0.4);
      g.fillCircle(ox + (x - ox) * k, oy + (y - oy) * k, 32);
    }
  }
}
