import Phaser from 'phaser';
import { step, isActive } from '../sim/step.js';
import { createMatch } from '../sim/state.js';
import { SUB, FPS, INTRO_FRAMES } from '../sim/constants.js';
import { hurtbox, hitbox, projectileBox } from '../sim/collision.js';
import { KeyboardInput } from '../input/keyboard.js';
import { TouchControls } from '../input/touch.js';
import { Cpu } from '../ai/cpu.js';
import lal from '../data/fighters/dummy-lal.json';
import neela from '../data/fighters/dummy-neela.json';

const FLOOR_Y = 640;
const STEP_MS = 1000 / FPS;
const MAX_STEPS_PER_FRAME = 5;
const BAR_W = 500;

const sx = (x) => x / SUB;
const sy = (y) => FLOOR_Y - y / SUB;
const hex = (color) => parseInt(color.slice(1), 16);

// Draws the fight state. No game logic lives here: it only reads state and collects inputs.
export class FightScene extends Phaser.Scene {
  constructor() {
    super('fight');
  }

  init(opts) {
    this.opts = opts;
  }

  create() {
    this.defs = [lal, neela];
    this.state = createMatch(this.defs);
    this.keyboard = new KeyboardInput(this);
    this.touch = this.sys.game.device.input.touch ? new TouchControls(this) : null;
    this.cpu = this.opts.mode === 'cpu' ? new Cpu(1, this.opts.level) : null;
    this.acc = 0;
    this.showBoxes = false;

    this.g = this.add.graphics();
    const text = (x, y, size, origin = 0.5) =>
      this.add
        .text(x, y, '', { fontFamily: 'system-ui', fontSize: `${size}px`, fontStyle: '800' })
        .setOrigin(origin, 0.5)
        .setDepth(50);
    this.timerText = text(640, 44, 40).setInteractive();
    this.timerText.on('pointerdown', () => (this.showBoxes = !this.showBoxes));
    this.names = [text(40, 80, 22, 0).setText(lal.name), text(1240, 80, 22, 1).setText(neela.name)];
    this.announce = text(640, 280, 84).setStroke('#000000', 10);
    this.subline = text(640, 360, 26).setColor('#dddddd');

    this.buttons = [
      this.button(520, 450, 'Rematch', () => this.scene.restart(this.opts)),
      this.button(760, 450, 'Menu', () => this.scene.start('menu')),
    ];

    const kb = this.input.keyboard;
    kb.on('keydown-ESC', () => this.scene.start('menu'));
    kb.on('keydown-ENTER', () => this.state.phase === 'over' && this.scene.restart(this.opts));
    kb.on('keydown-BACKTICK', () => (this.showBoxes = !this.showBoxes));
  }

  button(x, y, label, onTap) {
    const box = this.add
      .rectangle(x, y, 200, 64, 0x2a2a35)
      .setStrokeStyle(2, 0x888899)
      .setInteractive({ useHandCursor: true })
      .setDepth(60);
    const t = this.add
      .text(x, y, label, { fontFamily: 'system-ui', fontSize: '28px' })
      .setOrigin(0.5)
      .setDepth(61);
    box.on('pointerdown', () => this.state.phase === 'over' && onTap());
    return [box, t];
  }

  update(time, delta) {
    // Fixed 60 Hz simulation, whatever the screen's refresh rate.
    this.acc += Math.min(delta, 250);
    let steps = 0;
    while (this.acc >= STEP_MS && steps < MAX_STEPS_PER_FRAME) {
      this.state = step(this.state, this.readInputs(), this.defs);
      this.acc -= STEP_MS;
      steps++;
    }
    if (steps === MAX_STEPS_PER_FRAME) this.acc = 0;
    this.draw();
  }

  readInputs() {
    const p1 = this.keyboard.read(0) | (this.touch ? this.touch.read() : 0);
    const p2 = this.cpu ? this.cpu.next(this.state) : this.keyboard.read(1);
    return [p1, p2];
  }

  draw() {
    const s = this.state;
    const g = this.g.clear();

    g.fillStyle(0x1d2333).fillRect(0, 0, 1280, FLOOR_Y);
    g.fillStyle(0x3a3226).fillRect(0, FLOOR_Y, 1280, 720 - FLOOR_Y);
    g.lineStyle(2, 0x5a4d3a).lineBetween(0, FLOOR_Y, 1280, FLOOR_Y);

    s.fighters.forEach((f, i) => this.drawFighter(g, f, this.defs[i], s));

    for (const p of s.projectiles) {
      const b = projectileBox(p);
      g.fillStyle(hex(this.defs[p.owner].color)).fillCircle(
        sx(p.x),
        sy(p.y),
        (b.y1 - b.y0) / SUB / 2,
      );
      g.lineStyle(3, 0xffffff, 0.8).strokeCircle(sx(p.x), sy(p.y), (b.y1 - b.y0) / SUB / 2);
    }

    this.drawHud(g, s);
    if (this.touch) this.touch.draw();
  }

  drawFighter(g, f, def, s) {
    const color = hex(def.color);
    if (f.state === 'knockdown' || f.state === 'airhit') {
      const w = def.height;
      g.fillStyle(color, 0.8).fillRect(sx(f.x) - w / 2, sy(f.y) - 40, w, 40);
      return;
    }

    const hb = hurtbox(f, def);
    const x = sx(hb.x0);
    const y = sy(hb.y1);
    const w = (hb.x1 - hb.x0) / SUB;
    const h = (hb.y1 - hb.y0) / SUB;
    const flash = f.state === 'hitstun' && s.hitstop > 0;

    g.fillStyle(flash ? 0xffffff : color).fillRect(x, y, w, h);
    g.fillStyle(0x000000, 0.25).fillRect(x, y, w, 50);
    const eyeX = f.facing === 1 ? x + w - 22 : x + 8;
    g.fillStyle(0xffffff).fillRect(eyeX, y + 16, 14, 10);
    if (f.state === 'blockstun') g.lineStyle(5, 0x5ee6ff).strokeRect(x - 4, y - 4, w + 8, h + 8);

    if (f.state === 'attack') {
      const m = def.moves[f.move];
      if (m.hitbox) {
        const b = hitbox(f, m.hitbox);
        const active = isActive(f, m);
        g.fillStyle(active ? 0xffd34d : color, active ? 1 : 0.35);
        g.fillRect(sx(b.x0), sy(b.y1), (b.x1 - b.x0) / SUB, (b.y1 - b.y0) / SUB);
        if (this.showBoxes && active) {
          g.lineStyle(2, 0xff3355).strokeRect(
            sx(b.x0),
            sy(b.y1),
            (b.x1 - b.x0) / SUB,
            (b.y1 - b.y0) / SUB,
          );
        }
      } else if (m.type === 'throw' && isActive(f, m)) {
        const reach = def.width / 2 + m.range + 30;
        const gx = f.facing === 1 ? sx(f.x) : sx(f.x) - reach;
        g.fillStyle(0xffd34d, 0.8).fillRect(gx, sy(f.y) - 150, reach, 30);
      }
    }

    if (this.showBoxes) g.lineStyle(2, 0x4dff88).strokeRect(x, y, w, h);
  }

  drawHud(g, s) {
    s.fighters.forEach((f, i) => {
      const left = i === 0 ? 40 : 1240 - BAR_W;
      const share = Math.max(0, f.health) / this.defs[i].health;
      g.fillStyle(0x550000).fillRect(left, 30, BAR_W, 28);
      g.fillStyle(share > 0.3 ? 0xf2c230 : 0xf25a30);
      const fill = BAR_W * share;
      g.fillRect(i === 0 ? left + BAR_W - fill : left, 30, fill, 28);
      g.lineStyle(2, 0xffffff, 0.8).strokeRect(left, 30, BAR_W, 28);
      for (let w = 0; w < 2; w++) {
        const cx = i === 0 ? 560 - w * 26 : 720 + w * 26;
        g.fillStyle(w < s.wins[i] ? 0xf2c230 : 0x333344).fillCircle(cx, 82, 9);
      }
    });

    this.timerText.setText(String(Math.ceil(s.timer / FPS)));

    let big = '';
    let small = '';
    if (s.phase === 'intro') {
      big = s.phaseTimer > INTRO_FRAMES / 2 ? `ROUND ${s.round}` : 'DHARNA SHURU!';
    } else if (s.phase === 'ko' && s.result) {
      const { winner, reason } = s.result;
      big = winner === -1 ? 'DRAW' : reason === 'ko' ? 'KO!' : 'FORM 47!';
      if (reason === 'timeout' && winner !== -1)
        small = `Time's up. ${this.defs[winner].name} wins on paper.`;
    } else if (s.phase === 'over') {
      big = s.matchWinner === -1 ? 'DRAW' : `${this.defs[s.matchWinner].name.toUpperCase()} WINS`;
      small = 'Recount pending';
    }
    this.announce.setText(big);
    this.subline.setText(small);
    for (const [box, t] of this.buttons) {
      box.setVisible(s.phase === 'over');
      t.setVisible(s.phase === 'over');
    }
  }
}
