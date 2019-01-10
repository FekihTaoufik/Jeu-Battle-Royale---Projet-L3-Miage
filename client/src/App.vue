<template>
  <div id="app">
    <game :startGame="start_game" :pseudo="player.pseudo"></game>
    <iframe v-if="!start_game"  style="display:none;" width="560" height="315" src="https://www.youtube.com/embed/c5LgV5bpV5A?controls=0&autoplay=1&start=3&loop=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="main_div" v-if="!start_game">
    <div class="background"></div>
    <div class="interface-body">
      <div id="title_logo">
        <img src="./assets/img/bg_logo.png" alt="MiageWars">
        <div class="label"> Miage &nbsp;&nbsp;Wars </div>
        </div>
      <div class="nb_players_in">Nombre de joueurs en ligne : {{players_count}} joueurs</div>
      <div class="start_div">
        <input @keyup.enter.prevent="handleGameStart" placeholder="Saisir un pseudo" name="pseudo" id="player_pseudo" type="text" v-model="player.pseudo">
        <button id="start_game" @click="handleGameStart">Jouer</button>
      </div>
      <div class="classement">
        <div class="classement_header">Classement <div style="float:right;">TOP 10</div></div>
        <div>
          <table>
            <thead>
              <tr>
                <td>pseudo</td>
                <td>kills</td>
                <td>mort</td>
                <td>parties</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p,i) in records.concat(records,records,records)" :key="i">
                <td>{{p.pseudo}}</td>
                <td>{{p.kills}}</td>
                <td>{{p.deaths}}</td>
                <td>{{p.games}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import Game from './Game.vue'
export default {
  components:{'game':Game},
  data(){
    return{
      start_game:false,
      player:{
        pseudo:''
      },
      players_count:0,
      records :[
        {
          pseudo : 'player',
          kills:0,
          deaths:0,
          games:0
        }
        ]
    }
  },
  methods:{
    handleGameStart(){
      if(this.player.pseudo.length>=3){
        this.start_game=true; 
      }
        else
        alert('Un pseudo est obligatoire (aumoins 3 lettres)')
    },
  },
  name: 'app',
  mounted(){
    document.socket.emit('init_index');
    document.socket.on('players_count',(count)=>{
      console.log("GOT COUNT");
      this.players_count = count;
      })
  }
}
</script>

<style>
.main_div .background{
  background-color: rgba(0,0,0,.5);

  width:100%;
  height:100%;
  position:absolute;
  top:0px;
}
.interface-body{
  z-index:2;
  position:relative;
}
.main_div{
  position:fixed;
  top:0;
  z-index:1;
  width:100%;
  height:100%;
}
.classement table{
  font-family: 'Lato',sans-serif;
  background-color:#0063a9;
  padding:10px;
}
.classement .classement_header{
  text-transform: uppercase;
  font-weight:600;
  background-color:rgb(0, 150, 255);
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  text-align: left;
  padding:5px 10px;
  font-family: 'Lato',sans-serif;
}
.classement .classement_header,.classement table{
width:485px;
display:inline-block;
}
.classement{
  margin-top:15px;
  text-align: center;
  color:white;
}
@font-face {
font-family: "Doctor Glitch";
src: url("./assets/css/fonts/Doctor Glitch.eot"),
     url("./assets/css/fonts/Doctor Glitch.woff2"),
     url("./assets/css/fonts/Doctor Glitch.woff"),
     url("./assets/css/fonts/Doctor Glitch.ttf"),
     url("./assets/css/fonts/Doctor Glitch.otf"),
     url("./assets/css/fonts/Doctor Glitch.svg");
}
@import url('https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900');
#title_logo{
  margin-bottom:15px;
  text-align: center;
  font-size:100px;
  letter-spacing: 7px;
  font-family: 'Doctor Glitch';
  color:white;
  position:relative;
}
#title_logo > .label{
  z-index:2;
  position:relative;
}
#title_logo > img{
  position: absolute;
  z-index:1;
  top:-270px;
  left:0;
  right:0;
  margin:auto;
}
.nb_players_in{
  font-weight:300;
  font-size:25px;
  margin-bottom:15px;
  font-family: 'Lato';
  color:white;
  text-align: center;
}
button#start_game{
  cursor:pointer;
  vertical-align: top;
  margin-left:20px;
  font-family: 'Lato';
  text-transform: uppercase;
  font-weight: 600;
  color:white;
  padding:14px 20px;
  font-size:25px;
  border:1px solid transparent;
  border-radius: 5px;
  background-color: rgb(0, 150, 255);
}
input#player_pseudo{
  vertical-align: top;
  padding:0px 20px 0px 20px;
  font-size:20px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  width: 303px;
  height: 55px;
}
.start_div{
  text-align: center;
}
.main_div{
  padding-top:250px;
}
html,body,#app {
  overflow:hidden;
  margin:0;padding:0px;
  widows: 100%;
  height:100%;
  background-color:black;
}
</style>
