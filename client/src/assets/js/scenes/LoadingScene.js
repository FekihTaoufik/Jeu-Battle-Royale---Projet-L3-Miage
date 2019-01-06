const base_url = '/assets/img/game/'
export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadingScene'
        })
    }
    preload(){
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });
        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('GameScene');
            console.log("Completed")
        });
        console.log("Loading scene preloading")
    }
    create(){
        console.log("Loading scene create")
    }
}