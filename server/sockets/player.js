const _ = require('lodash')
const mo = require('moment')
module.exports = (io) => {
    var players={}
    var game ={
        players:{}
    }
    io.on('connect',function(client){
        players[client.id]={
            id : client.id,
            pseudo: null
        };
        console.log(`➕  Joueur ${client.id} s'est connecté`)
        console.log(`📢  Joueurs connecté : ${Object.keys(players).length}`)

        client.broadcast.emit('players_list',players)
        client.on('disconnect',()=>{
            console.log(`➖  Joueur ${client.id} s'est déconnecté`)
            delete players[client.id];
            console.log(`📢  Joueurs connecté : ${players.length}`,players)
            client.broadcast.emit('players_list',players)
            // leave game
            
            client.broadcast.emit('player_left_game',client.id)
            console.log(game);
        })
        client.on('join_game',(player)=>{
            game.players[client.id]=player;
            player.id = client.id;
            client.broadcast.emit('player_joined_game',player);
            console.log(game);
        })
        client.on('player_moving',(player)=>{
            players[client.id]=player;
            player.id = client.id;
            client.broadcast.emit('player_moving',player)
        })
        client.on('player_shooting',(o)=>{
            //var  o = { player : player , bullet : bullet}
            client.broadcast.emit('player_shooting',o)
        })
        client.on('player_died',(player)=>{
            client.broadcast.emit('player_died',player)
        })
        client.on('player_revived',(player)=>{
            client.broadcast.emit('player_revived',player)
        })
        client.on('init_index',()=>{ client.emit('players_list',players)})
    })
}