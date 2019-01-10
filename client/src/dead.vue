<template>
<div class="dead">
    <div>
        <img  style="margin-top:27px;height:110px;" src="./assets/img/dead.png" alt="Dead">
    <div style="    text-transform: uppercase;
    font-weight: 900;
    font-size: 32px;
    margin-top: 8px;">Vous etes MORT</div>
    <div style="font-size:20px;">Bravo ! Vous avez tué {{kills}} joueurs</div>
    <button style="margin-top:15px;" class="button">Rejouer !</button><br>
    <button style="margin-top:15px;" class="button button-red">Menu principal</button>
    </div>
</div>
</template>

<script>
export default {
    name:'dead',
    props:['kills'],
    data(){
        return {
        }
    },
    methods:{
    },
    created(){  
    }
}
</script>
<style>
.dead > div{
    width:400px;
    height:420px;
    background-color:white;
    border-radius:15px;
    position: absolute;
    margin:auto;
    left:0;right:0;
    top:0;
    bottom:0;
    text-align:center;
    font-family:'Open sans',sans-serif;
}
.dead{
    position:absolute;  
    background-color:rgba(0,0,0,.5);
    width:100%;
    height:100%;
    z-index:12;
}
.button {
  padding: 15px 25px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button-red{
  background-color: rgb(196, 64, 31) !important;
}
.button-red:hover{
  background-color: rgb(185, 51, 17) !important;
}
.button-red:active{
  background-color: rgb(177, 35, 0) !important;
}
.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
