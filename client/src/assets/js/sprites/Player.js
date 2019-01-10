
import HealthBar from './HealthBar'
export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) 
    {
        console.log("CREATED PLAYER",config);
        super(config.scene, config.x, config.y, config.key)
        this.pseudo = config.pseudo
        config.scene.physics.world.enable(this)
        this.isDead=false
        this.setDisplaySize(70, 70)
        this.body.setSize(150,140)
        this.body.setOffset(50,55)
        this.socket = config.socket
        this.scene=config.scene
        this.setScale(0.5)
        this.depth = 10
        this.setOrigin(0.4,0.6)
        this.acceleration = 1000
        this.body.maxVelocity.x = 500
        this.body.maxVelocity.y = 500
        this.state = 'idle'
        this.weapon = 'shotgun'
        this.anims.play(`player_${this.weapon}_idle`)
        //this.setSize(50,10, true);
        //this.weapon = new Weapon()
        this.health = new HealthBar(config.scene, this.x, this.y,config.makeHealthBar);
        this.on('animationcomplete', function(anim, frame){
            if (anim.key.includes('reload'))
            {
                //console.log("GOING IDLE", anim, frame)
                this.idle();
            }
        }, this);
        // Weapon and bullets
        // this.bullets = config.scene.physics.add.group({classType:Bullet,runChildUpdate:true},config)
        console.log(this,'HERE IS THE PLAYA')
        config.scene.add.existing(this)
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

    update(keys, reticle, time, delta, socket) {
        if(this.isDead)
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
            this.socket.emit('player_moving', this)
    }
    die(emit,killerId){
        if(this.isDead)
            return;

            this.body.setAccelerationX(0)
            this.body.setAccelerationY(0)
            this.isDead=true;
            if(emit){
                var dead = this.scene.sound.add('dead',{rate:1})
                dead.play()
                this.socket.emit('player_died',{killerId:killerId})
                this.socket.vue.isDead=true;
                _.map(this.socket.vue.table,(k,key)=>{
                    if(k.id == killerId)
                    this.socket.vue.table[key].score++;
                })
            }
        this.anims.stop()
        this.setTexture('rip')
        if(this.setActive(false))
            return true;
    }

    hitCallback(enemyHit, bulletHit)
    {
        if ( enemyHit.socket.id == bulletHit.playerId ){
            return;
        }
        bulletHit.clear()
        if(enemyHit.health.value>0)
        {
            enemyHit.health.decrease(Math.round(Math.random()*10));
        }
        else if (!this.isDread)
        {
            enemyHit.die(true,bulletHit.playerId);
        }
        
        console.log(enemyHit.socket.id," GOT HIT MY HEALTH IS NOW ",enemyHit.health.value)
    }
}