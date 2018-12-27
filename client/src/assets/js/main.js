import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import Loading_scene from './scenes/LoadingScene';

export default {
  start (socketio){
    var Game_scene = new GameScene(socketio)
    const config = {
        type: Phaser.WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        parent:'phaser-app',
        physics: {
    
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: true
          }
        },
        scene: [
          // Loading_scene,
          Game_scene
        ]
    };
    return new Phaser.Game(config)
  } 
}
