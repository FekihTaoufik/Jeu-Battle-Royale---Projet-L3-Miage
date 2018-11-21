<template>
    <div id="app">
        <div id="game"></div>
    </div>
</template>

<script>
import Jeu from "./assets/js/main.js";
export default {
    data(){
        return {
            
        }
    },
    sockets:{
        pong(e){
            console.log("RECEIVED : PONG");
        }
    },
    mounted(){
        var context = this;
        setInterval(() => {
            context.$socket.emit('test',true);
            console.log("PINGED SERVER");
        }, 2000);
    }
}
</script>
<style>
body,html{
    width:100%;
    height:100%;
    margin:0px;
    padding:0px;
}
</style>


