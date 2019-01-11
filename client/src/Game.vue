<template>
<div>
        <dead @replay="handleReplay" @backToMenu="handleBackToMenu" v-if="isDead" :kills="myKills()"></dead>
        <score-table v-show="gameStarted" :table='table' style="z-index:11;"></score-table>
        <div style="z-index:10" id="phaser-app" @mousedown="handleMouseDown"></div>
    </div> 
</template>

<script>
import Jeu from "./assets/js/main.js";
import scoreTable from './scoreTable.vue';
import dead from './dead.vue';

var game;
export default {
    components:{
        'score-table':scoreTable,
        'dead':dead
    },
    name:'game',
    props:['startGame','pseudo'],
    watch:{
        startGame(newV,oldV){
            if(newV){
                document.socket.vue = this
                game = Jeu.start(document.socket)
                console.log(game)
            }
        },
    },
    data(){
        return {
            jeu :{},
            table:[],
            gameStarted:false,
            isDead:false
        }
    },
    sockets:{
    },
    methods:{
        handleBackToMenu(){
            this.$emit('backToMenu')
            this.gameStarted=false;
            this.isDead=false;
            game.scene.scenes[0].scene.stop()
        },
        handleReplay(){
            this.isDead=false;
            game.scene.scenes[0].scene.restart()
        },
        handleMouseDown(){
            game.input.mouse.requestPointerLock();
        },
        myKills(){
            for (let i = 0; i < this.table.length; i++) {
                const t = this.table[i];
                if(t.id == document.socket.id)
                    return t.score
                
            }
            return 0;
        },
    },
    created(){  
    }
}
</script>
<style>
body,html{
    padding:0;
    margin:0;
    width:100%;
    height:100%;
}
#phaser-app{
    width:100%;
    height:100%;
    margin:0px;
    padding:0px;
}
</style>


