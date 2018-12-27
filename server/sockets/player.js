const _ = require('lodash')
const mo = require('moment')
module.exports = (io) => {
    var players = {}
    var game = {
        players: {}
    }
    io.on('connect', function (client) {
        client.player ={
            id: client.id,
            pseudo: null
        }
        players[client.id] = client.player;
        console.log(`➕  Joueur ${client.id} s'est connecté`)
        console.log(`📢  Joueurs connecté : ${Object.keys(players).length}`)
        client.on('disconnect', () => {
            console.log(`➖  Joueur ${client.id} s'est déconnecté`)
            delete players[client.id];
            console.log(`📢  Joueurs connecté : ${players.length}`, players)
            client.broadcast.emit('player_disconnected',client.id)
            // leave game
            delete game.players[client.id];
            client.broadcast.emit('player_quit_game', client.id);
        })
        client.on('quit_game', (player) => {
            delete game.players[client.id];
            client.broadcast.emit('player_quit_game', client.id);
        })
        client.on('join_game', (player) => {
            game.players[client.id] = player;
            player.id = client.id;
            _players = _.clone(players)
            delete _players[client.id]
            client.emit('players_list',_players)
            client.broadcast.emit('player_joined_game', player);
        })
        client.on('player_moving', (player) => {
            players[client.id] = player;
            player.id = client.id;
            client.broadcast.emit('player_moving', player)
        })
        client.on('player_shooting', (o) => {
            //var  o = { player : player , bullet : bullet}
            client.broadcast.emit('player_shooting', o)
        })
        client.on('player_died', (player) => {
            client.broadcast.emit('player_died', player)
        })
        client.on('player_revived', (player) => {
            client.broadcast.emit('player_revived', player)
        })
        client.on('init_index', () => {
            client.emit('players_list', _.filter(players, (o, i) => {
                return _.toString(i) != _.toString(client.id)
            }))
        })
    })
}