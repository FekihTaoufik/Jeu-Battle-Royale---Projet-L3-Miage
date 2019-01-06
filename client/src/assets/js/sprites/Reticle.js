export default class Reticle extends Phaser.GameObjects.Sprite
{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.depth=11
        this.setScale(0.2)
        // this.acceleration = 600;
        // this.body.maxVelocity.x = 200;
        // this.body.maxVelocity.y = 500;
    }
    constrainReticle(player)
    {
        var distX = this.x-player.x; // X distance between player & this
        var distY = this.y-player.y; // Y distance between player & this
    
        // Ensures this cannot be moved offscreen (player follow)
        if (distX > 800)
            this.x = player.x+800;
        else if (distX < -800)
            this.x = player.x-800;
    
        if (distY > 600)
        this.y = player.y+600;
        else if (distY < -600)
            this.y = player.y-600;
        }
    update(keys,player,time,delta){
        this.body.velocity.x = player.body.velocity.x;
        this.body.velocity.y = player.body.velocity.y;
        this.constrainReticle(player)
    }
    
}