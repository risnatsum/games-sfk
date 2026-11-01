import Phaser from 'phaser';

const OPTIONS = [
  { label: 'Versus CPU: Easy', mode: 'cpu', level: 'easy' },
  { label: 'Versus CPU: Normal', mode: 'cpu', level: 'normal' },
  { label: 'Versus CPU: Hard', mode: 'cpu', level: 'hard' },
  { label: '2 Players (one keyboard)', mode: 'local' },
];

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create() {
    this.add
      .text(640, 120, 'SIYASI SHOWDOWN', {
        fontFamily: 'system-ui',
        fontSize: '72px',
        fontStyle: '900',
      })
      .setOrigin(0.5);
    this.add
      .text(640, 185, 'M0 prototype · grey boxes only', {
        fontFamily: 'system-ui',
        fontSize: '24px',
        color: '#aaaaaa',
      })
      .setOrigin(0.5);

    OPTIONS.forEach((opt, i) => {
      const y = 290 + i * 88;
      const box = this.add
        .rectangle(640, y, 520, 68, 0x2a2a35)
        .setStrokeStyle(2, 0x666677)
        .setInteractive({ useHandCursor: true });
      this.add
        .text(640, y, `${i + 1}.  ${opt.label}`, { fontFamily: 'system-ui', fontSize: '30px' })
        .setOrigin(0.5);
      box.on('pointerdown', () => this.start(opt));
      this.input.keyboard.on(`keydown-${['ONE', 'TWO', 'THREE', 'FOUR'][i]}`, () =>
        this.start(opt),
      );
    });

    this.add
      .text(
        640,
        670,
        'Keyboard P1: WASD move · F light · G heavy · H special · F+G throw     P2: arrows · K · L · ;',
        { fontFamily: 'system-ui', fontSize: '18px', color: '#888888' },
      )
      .setOrigin(0.5);
  }

  start(opt) {
    this.scene.start('fight', opt);
  }
}
