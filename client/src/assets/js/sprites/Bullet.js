export default class Bullet extends Phaser.GameObjects.Image
{
    constructor(config)
    {
        //console.log("CREATED BULLET",config);
        super(config,config.player.x,config.player.y,'bullet')
        this.speed = 1.3;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.offset={
            x:60,
            y:40,
            const:0
        };
        this.depth = 9
        this.setOrigin(0.5,0.5)
        this.setDisplaySize(40, 8)
        this.setSize(40,8, true);
    }

    // Fires a bullet from the player to the reticle
    fire(shooter, target)
    {       
        this.setPosition(shooter.x+(Math.cos(shooter.rotation)*this.offset.x), shooter.y+(Math.sin(shooter.rotation)*this.offset.y)); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));
        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }
        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    }
    
    // Updates the position of the bullet each cycle
    update(time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}