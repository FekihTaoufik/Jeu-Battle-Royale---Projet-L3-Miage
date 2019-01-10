<template>
        <div id="phaser-app" @mousedown="handleMouseDown"></div>
</template>

<script>
import Jeu from "./assets/js/main.js";
var game;
export default {
    name:'game',
    props:['startGame','pseudo'],
    watch:{
        startGame(newV,oldV){
            if(newV)
                game = Jeu.start(document.socket,this.pseudo)
        },
    },
    data(){
        return {
            jeu :{}
        }
    },
    sockets:{
    },
    methods:{
        handleMouseDown(){
            game.input.mouse.requestPointerLock();
        }
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


