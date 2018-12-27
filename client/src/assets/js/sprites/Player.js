//import Weapon from './Weapon'
export default class Player extends Phaser.GameObjects.Sprite
{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key)
        config.scene.physics.world.enable(this)
        config.scene.add.existing(this)
        this.acceleration = 1000
        this.body.maxVelocity.x = 500
        this.body.maxVelocity.y = 500
        this.state='idle'
        this.weapon = 'handgun'
        this.anims.play(`player_${this.weapon}_idle`)
        //this.weapon = new Weapon()
        this.on('animationcomplete', function (anim, frame) {
            this.idle()
          }, this);
    }
    attack(){
        if(!this.anims.isPlaying || this.anims.getCurrentKey().indexOf('idle')!=-1 ){
            this.anims.play(`player_${this.weapon}_${this.weapon=='knife'?'meleeattack':'shoot'}`)
        }
    }
    idle(){
        if(this.anims.getCurrentKey().indexOf('idle')!=-1)
        this.anims.play(`player_${this.weapon}_idle`,true)
    }
    move(){
        if(this.anims.getCurrentKey().indexOf('move')!=-1)
            this.anims.play(`player_${this.weapon}_move`,true)
    }
    constrainVelocity(maxVelocity)
    {
        if (!this || !this.body)
        return;
  
      var angle, currVelocitySqr, vx, vy;
      vx = this.body.velocity.x;
      vy = this.body.velocity.y;
      currVelocitySqr = vx * vx + vy * vy;
  
      if (currVelocitySqr > maxVelocity * maxVelocity)
      {
          angle = Math.atan2(vy, vx);
          vx = Math.cos(angle) * maxVelocity;
          vy = Math.sin(angle) * maxVelocity;
          this.body.velocity.x = vx;
          this.body.velocity.y = vy;
      }
    }
    runX(vel) {
        this.body.setAccelerationX(vel)
    }
    runY(vel) {
        this.body.setAccelerationY(vel)
    }

    update(keys,reticle,time,delta,socket){
        var old = {
            x:this.x,
            y:this.y,
            rotation:this.rotation
        }

        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, reticle.x, reticle.y)-0.1
        // console.log(input)
        if(!keys.up.isDown || !keys.down.isDown || !!keys._up.isDown || !keys._down.isDown){
            this.runY(-this.body.velocity.y*2);
        }
        if(!keys.right.isDown || !keys.left.isDown || !!keys._right.isDown || !keys._left.isDown){
            this.runX(-this.body.velocity.x*2);
        }
            this.constrainVelocity(500)


        if (keys._up.isDown || keys.up.isDown) this.runY(-800)
        if (keys._down.isDown || keys.down.isDown) this.runY(800)
        if (keys._right.isDown || keys.right.isDown) this.runX(800)
        if (keys._left.isDown || keys.left.isDown) this.runX(-800)
        if(keys.up.isDown || keys.down.isDown || keys.right.isDown || keys.left.isDown || keys._up.isDown || keys._down.isDown || keys._right.isDown || keys._left.isDown)
            this.move()
            else
            this.idle()

            
            if(old.rotation != this.rotation ||old.x != this.x ||old.y != this.y)
                socket.emit('player_moving',this)
    }
}