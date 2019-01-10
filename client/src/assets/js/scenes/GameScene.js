import _ from 'lodash'
import Player from './../sprites/Player'
import HealthBar from './../sprites/HealthBar'
import Bullet from './../sprites/Bullet'
import Reticle from './../sprites/Reticle'
import {animation_load,animation_create} from './../helpers/animations'
const base_url = '/assets/img/game/'
export default class GameScene extends Phaser.Scene {
    constructor(socketio,pseudo) {
        super({
            key: 'GameScene'
        })
        this.socket = socketio
        this.playerPseudo = pseudo
    }
    preload(){
        var lifeBar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', function (value) {
    console.log(value);
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
         
        this.load.on('complete', function () {
            console.log('complete');
progressBar.destroy();
progressBox.destroy();
        });


        this.players={}
        this.load.path= base_url







  this.load.image("tiles", "map/TilesetSnow.png");
  this.load.tilemapTiledJSON("map", "map/MaMap.json");







        // this.load.image('background', `map/green.png`)
        this.load.image('reticle', `locker/locker.png`)
        this.load.image('bullet', `bullets/bullet.png`)
        this.load.audio('rifle_shoot', [ 'sounds/rifle.wav','sounds/rifle.mp3' ]);
        animation_load(this)
        this.socket.on('players_list',(list)=>{
            // console.log("Received players List",list)
            _.map(list,(p,id)=>{
                if(this.players[id] != undefined)
                    return
                this.players[id] = new Player({
                    socketid : id,
                    scene: this,
                    key: p.textureKey,
                    x: p.x,
                    y: p.y,
                    rotation:p.rotation,
                    makeHealthBar:false
                })
            })
        })
        this.socket.on('player_moving',(p)=>{
            if(this.players[p.id] == undefined)
                return
            this.players[p.id].x = p.x
            this.players[p.id].y = p.y
            this.players[p.id].rotation = p.rotation
        })
        this.socket.on('player_quit_game',(id)=>{
            this.players[id].destroy()
            delete this.players[id]
        })
        this.socket.on('player_died',(id)=>{
            this.players[id].die(false)
        })
        
        this.socket.on('player_reloading',(id)=>{
            // console.log(id,this.players[id])
            this.players[id].reload()
        })
        this.socket.on('player_shooting',(config)=>{
            // console.log("Une balle a été tiré")
            var b = this.bullets 
            var bullet = this.bullets.get(this).setActive(true).setVisible(true);
        if (bullet) {
            bullet.fire(config.player, config.reticle);
            this.physics.add.collider(this.player, bullet, this.player.hitCallback);
        }
        })
        this.socket.on('player_joined_game',(p)=>{
            // console.log("Players joined the game ",p)
            if(this.players[p.id] != undefined)
            return;
            this.players[p.id] = new Player({
                socketid : p.id,
                scene: this,
                key: p.textureKey,
                x: p.x,
                y: p.y,
                rotation:p.rotation,
                makeHealthBar:false
            })
        })
        
    }
    create(){
        animation_create(this)
        
        const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("tileset", "tiles");

  const worldLayer = map.createStaticLayer("Monde", tileset, 0, 0);
  const collideLayer = map.createStaticLayer("Collision", tileset, 0, 0);





        var first = this.sound.add('rifle_shoot',{rate:10});
        this.physics.world.setBounds(0, 0, 1600, 1200)
        // var background = this.add.image(1600, 1200, 'tiles')
        this.player = new Player({
            socketid : this.socket.id,
            scene: this,
            key: 'player_knife_idle_0',
            x: this.sys.game.config.width/1.5,
            y: this.sys.game.config.height/1.5,
            rotation:50,
            makeHealthBar:true
        })
        this.physics.add.collider(this.player, collideLayer);
        this.bullets = this.physics.add.group({
            classType: Bullet,
            // maxSize: 10,
            runChildUpdate: true});
        
        this.reticle = new Reticle({ 
            scene: this,
            key: 'reticle',
            x: this.sys.game.config.width/2,
            y: this.sys.game.config.height/2,
        }
            )
        this.cameras.main.zoom = 0.8;
        this.cameras.main.startFollow(this.player)

        this.keys = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            _up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            _down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            _left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            _right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            mouse:{x:0,y:0,isDown:false,isLocked:false}
        };

        this.input.on('pointermove', function (pointer) {
                this.keys.mouse.isLocked=this.input.mouse.locked
            if(this.input.mouse.locked){
               this.reticle.x += pointer.movementX
               this.reticle.y += pointer.movementY
            }
        }, this);
        /*
        FOR TEST
        */
       var fire_auto =[]
       this.input.on('pointerdown', function (pointer) {
           if(this.player.isDead)
            return
        this.keys.mouse.isDown=true
        this.player.attack()
        var bullet = this.bullets.get(this).setActive(true).setVisible(true);
        if (bullet)
        {
            this.socket.emit('player_shooting',{player:this.player,reticle:this.reticle})
            bullet.fire(this.player, this.reticle);
            // _.map(this.players,(p,id)=>{ if(id != this.socket.id) this.physics.add.collider(p, bullet, p.hitCallback); })
        }
        fire_auto.push(setInterval(() => {
            // console.log("IN THE INTERVAL");
            var bullet = this.bullets.get(this).setActive(true).setVisible(true);
            if (bullet)
            {
                this.socket.emit('player_shooting',{player:this.player,reticle:this.reticle})
                bullet.fire(this.player, this.reticle);
                // _.map(this.players,(p,id)=>{ if(id != this.socket.id) this.physics.add.collider(p, bullet, p.hitCallback); })
                }
            }, 100))
            
        }, this);
        this.input.on('pointerup', function (pointer) { 
            if(this.player.isDead)
                return
            this.keys.mouse.isDown=false 
            // console.log("Pointer UP")
            this.player.idle();
            _.map(fire_auto,(o)=>{
                clearInterval(o)
            })
        }, this);
        this.input.keyboard.on('keydown', function (event) {
            if(this.player.isDead)
                return
            
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.R)
            {
                this.player.reload()
                this.socket.emit('player_reloading')
                

            }
    
        },this);
        this.socket.emit('join_game',this.player)
    }
    update(time,delta){
        this.player.update(this.keys,this.reticle, time, delta,this.socket);
        this.reticle.update(this.keys,this.player, time, delta);
    }
}