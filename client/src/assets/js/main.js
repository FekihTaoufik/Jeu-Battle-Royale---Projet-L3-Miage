import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'phaser-app',
    width: 400,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: false
        }
    },
    scene: [
        GameScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
