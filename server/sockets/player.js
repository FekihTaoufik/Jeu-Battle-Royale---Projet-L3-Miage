const _ = require('lodash')
const mo = require('moment')
module.exports = (io) => {
    var players=[]
    var game ={
        players:[]
    }
    io.on('connect',function(client){
        players.push({
            id : client.id,
            pseudo: null
        })
        console.log(`➕  Joueur ${client.id} s'est connecté`)
        console.log(`📢  Joueurs connecté : ${players.length} [${_.join(_.map(players,'id'),', ')}]`)
        client.broadcast.emit('players_list',players)
        client.on('disconnect',()=>{
            console.log(`➖  Joueur ${client.id} s'est déconnecté`)
            players = players.filter(o=>{ return o.id != client.id })
            console.log(`📢  Joueurs connecté : ${players.length} [${_.join(_.map(players,'id'),', ')}]`)
            client.broadcast.emit('players_list',players)
        })
        client.on('join_game',(player)=>{
            
        })
        client.on('player_moving',(player)=>{
            client.broadcast('player_moving',player)
        })
        client.on('player_shooting',(o)=>{
            //var  o = { player : player , bullet : bullet}
            client.broadcast('player_shooting',o)
        })
        client.on('player_died',(player)=>{
            client.broadcast('player_died',player)
        })
        client.on('player_revived',(player)=>{
            client.broadcast('player_revived',player)
        })
        client.on('init_index',()=>{ client.emit('players_list',players)})
    })
}