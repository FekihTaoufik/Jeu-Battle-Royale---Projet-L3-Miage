import Bullet from "./Bullet";

//import Weapon from './Weapon'
export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) 
    {
        console.log("CREATED PLAYER",config);
        super(config.scene, config.x, config.y, config.key)
        config.scene.physics.world.enable(this)
        config.scene.add.existing(this)
        this.setDisplaySize(312, 206)
        this.setSize(312, 206,true)
        this.setScale(0.5)
        this.depth = 10
        this.setOrigin(0.3,0.6)
        this.socketid = config.socketid
        this.acceleration = 1000
        this.body.maxVelocity.x = 500
        this.body.maxVelocity.y = 500
        this.state = 'idle'
        this.weapon = 'shotgun'
        this.anims.play(`player_${this.weapon}_idle`)
        //this.setSize(50,10, true);
        //this.weapon = new Weapon()
        this.health = 100
        this.on('animationcomplete', function(anim, frame){
            if (anim.key.includes('reload'))
            {
                //console.log("GOING IDLE", anim, frame)
                this.idle();
            }
        }, this);
        // Weapon and bullets
        // this.bullets = config.scene.physics.add.group({classType:Bullet,runChildUpdate:true},config)
    }
    
    attack()
    {
        if(this.anims.getCurrentKey().includes('idle') || this.anims.getCurrentKey().includes('move'))
        {
            //console.log("SHOOTING");
            this.anims.play(`player_${this.weapon}_${this.weapon=='knife'?'meleeattack':'shoot'}`)
        }
    }
    
    idle()
    {
        if (!this.anims.getCurrentKey().includes('idle'))
        {
            //console.log("IDLE")
            this.anims.play(`player_${this.weapon}_idle`)
        }
    }

    move()
    {
        if (this.anims.getCurrentKey().includes('reload') || (this.weapon == 'rifle' && this.anims.getCurrentKey().includes('shoot')))
        {
            //console.log("RELOADING : CANT MOVE")
            return
        }
        if (!this.anims.getCurrentKey().includes('move'))
        {
            //console.log("MOVING")
            this.anims.play(`player_${this.weapon}_move`)
        }
    }

    reload()
    {
        //console.log("RELOADING")
        this.anims.play(`player_${this.weapon}_reload`)
    }

    constrainVelocity(maxVelocity)
    {
        if (!this || !this.body)
            return;
        var angle, currVelocitySqr, vx, vy;
        vx = this.body.velocity.x;
        vy = this.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;
        if(currVelocitySqr > maxVelocity * maxVelocity)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            this.body.velocity.x = vx;
            this.body.velocity.y = vy;
        }
    }
    
    runX(vel)
    {
        this.body.setAccelerationX(vel)
    }
    
    runY(vel)
    {
        this.body.setAccelerationY(vel)
    }

    update(keys, reticle, time, delta, socket)
    {
        if(this.health<=0)
            return;
        var old = {
            x: this.x,
            y: this.y,
            rotation: this.rotation
        }

        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, reticle.x, reticle.y) - 0.1
        //console.log(input)
        if (!keys.up.isDown || !keys.down.isDown || !!keys._up.isDown || !keys._down.isDown) 
        {
            this.runY(-this.body.velocity.y * 2);
        }
        if (!keys.right.isDown || !keys.left.isDown || !!keys._right.isDown || !keys._left.isDown) 
        {
            this.runX(-this.body.velocity.x * 2);
        }
        this.constrainVelocity(500)

        if (keys._up.isDown || keys.up.isDown) this.runY(-800)
        if (keys._down.isDown || keys.down.isDown) this.runY(800)
        if (keys._right.isDown || keys.right.isDown) this.runX(800)
        if (keys._left.isDown || keys.left.isDown) this.runX(-800)
        if (keys.up.isDown || keys.down.isDown || keys.right.isDown || keys.left.isDown || keys._up.isDown || keys._down.isDown || keys._right.isDown || keys._left.isDown)
            this.move()
        
            if (old.rotation != this.rotation || old.x != this.x || old.y != this.y)
            socket.emit('player_moving', this)
    }

    die()
    {
        this.destroy();
    }

    hitCallback(bullet)
    {
        if(this.health>0)
        {
            this.health-=1;
        }
        else
        {
            this.die();
            //console.log("THIS GUY IS DEAD")
        }
        //console.log(this.socketid," GOT HIT MY HEALTH IS NOW ",this.health , bullet)
    }
}