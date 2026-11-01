import Phaser from 'phaser';
import { MenuScene } from './render/MenuScene.js';
import { FightScene } from './render/FightScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 1280,
  height: 720,
  backgroundColor: '#14141c',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { activePointers: 5 },
  scene: [MenuScene, FightScene],
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
