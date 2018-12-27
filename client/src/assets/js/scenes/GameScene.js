import _ from 'lodash'
import Player from './../sprites/Player'
import Reticle from './../sprites/Reticle'
import {animation_load,animation_create} from './../helpers/animations'
const base_url = '/assets/img/game/'
export default class GameScene extends Phaser.Scene {
    constructor(socketio) {
        super({
            key: 'GameScene'
        })
        this.socket = socketio
    }
    preload(){
        this.players={}
        this.load.path= base_url
        this.load.image('background', `map/green.png`)
        this.load.image('reticle', `locker/locker.png`)
            this.load.audio('rifle_shoot', [ 'sounds/rifle.wav','sounds/rifle.mp3' ]);
        animation_load(this)
        this.socket.on('players_list',(list)=>{
            console.log("Received players List",list)
            _.map(list,(p,id)=>{
                if(this.players[id] != undefined)
                    return
                this.players[id] = new Player({
                    scene: this,
                    key: p.textureKey,
                    x: p.x,
                    y: p.y,
                    rotation:p.rotation
                })
                this.players[id].setDisplaySize(132, 120)
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
        this.socket.on('player_joined_game',(p)=>{
            console.log("Players joined the game ",p)
            if(this.players[p.id] != undefined)
            return;
            this.players[p.id] = new Player({
                scene: this,
                key: p.textureKey,
                x: p.x,
                y: p.y,
                rotation:p.rotation
            })
            this.players[p.id].setDisplaySize(132, 120)
        })
        
    }
    create(){
        animation_create(this)
        var first = this.sound.add('rifle_shoot',{rate:10});
        this.physics.world.setBounds(0, 0, 1600, 1200)
        var background = this.add.image(1600, 1200, 'background')
        this.player = new Player({
            scene: this,
            key: 'player_knife_idle_0',
            x: this.sys.game.config.width/2,
            y: this.sys.game.config.height/2,
            rotation:50
        })
        this.socket.emit('join_game',this.player)
        this.reticle = new Reticle({ 
            scene: this,
            key: 'reticle',
            x: this.sys.game.config.width/2,
            y: this.sys.game.config.height/2,
        }
            )
        this.cameras.main.zoom = 0.8;
        this.cameras.main.startFollow(this.player)

        this.player.setDisplaySize(132, 120)
        this.reticle.setDisplaySize(50, 50);


        this.keys = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            mouse:{x:0,y:0,isDown:false,isLocked:false}
        };

        this.input.on('pointermove', function (pointer) {
                this.keys.mouse.isLocked=this.input.mouse.locked
            if(this.input.mouse.locked){
               this.reticle.x += pointer.movementX
               this.reticle.y += pointer.movementY
            }
        }, this);

        this.input.on('pointerdown', function (pointer) { this.keys.mouse.isDown=true
            this.player.attack()
            first.play()
            
        }, this);
        this.input.on('pointerup', function (pointer) { 
            this.keys.mouse.isDown=false 
            this.player.idle()
        }, this);
    }
    update(time,delta){
        this.player.update(this.keys,this.reticle, time, delta,this.socket);
        this.reticle.update(this.keys,this.player, time, delta);
    }
}