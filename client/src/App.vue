<template>
  <div id="app">
    <iframe  style="display:none;" width="560" height="315" src="https://www.youtube.com/embed/c5LgV5bpV5A?controls=0&autoplay=1&start=3&loop=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div class="background"></div>
    <div class="main_div">
      <div id="title_logo">Miage Wars</div>
      <div class="nb_players_in">Nombre de joueurs en ligne : 15 joueurs</div>
      <div class="start_div">
        <input placeholder="Saisir un pseudo" name="pseudo" id="player_pseudo" type="text" v-model="player.pseudo">
        <button id="start_game">Jouer</button>
      </div>
      <div class="classement">
        <div class="classement_header"></div>
        <div>
          <table>
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      player:{
        pseudo:'BUFFA'
      }
    }
  },
  name: 'app',
  components: {
  }
}
</script>

<style>
@font-face {
    font-family: 'Doctor Glitch';
    src: url('./assets/css/fonts/Doctor Glitch.otf');
}
@font-face {
font-family: "Doctor Glitch";
src: url("./assets/css/fonts/Doctor Glitch.eot");
src: url("./assets/css/fonts/Doctor Glitch.eot?#iefix") format("embedded-opentype"),
     url("./assets/css/fonts/Doctor Glitch.woff") format("woff"),
     url("./assets/css/fonts/Doctor Glitch.ttf")  format("truetype");
font-weight: normal;
font-style: normal
}
@import url('https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900');
#title_logo{
  margin-bottom:15px;
  text-align: center;
  font-size:100px;
  letter-spacing: 7px;
  font-family: 'Doctor Glitch', Helvetica, Arial, sans-serif;
  color:white;
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
  margin-top:200px;
}
html,body,#app {
  overflow:hidden;
  margin:0;padding:0px;
  widows: 100%;
  height:100%;
  background-color:black;
}
</style>
