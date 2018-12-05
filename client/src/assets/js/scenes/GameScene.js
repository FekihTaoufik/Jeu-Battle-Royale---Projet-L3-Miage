import Player from './../sprites/Player'
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    preload(){
        var base_url = '/assets/img/game/';
        this.load.atlas('player-sprites', `${base_url}/sprites/idle_handgun.png`,`${base_url}/sprites/idle_handgun.json`);
    }
    create(){}
    update(time,delta){}
}

export default GameScene;
