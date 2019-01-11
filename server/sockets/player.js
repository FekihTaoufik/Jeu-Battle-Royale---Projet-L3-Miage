const _ = require('lodash')
const mo = require('moment')
module.exports = (io) => {
    var connected = {}
    var game = {
        players: {}
    }
    io.on('connect', function (client) {
        client.player ={
            id: client.id,
            pseudo: null
        }
        connected[client.id] = client.player;
        client.broadcast.emit('players_count',Object.keys(connected).length-1)
        console.log(`➕  Joueur ${client.id} s'est connecté`)
        console.log(`📢  Joueurs connecté : ${Object.keys(connected).length}`)
        client.on('disconnect', () => {
            console.log(`➖  Joueur ${client.id} s'est déconnecté`)
            delete connected[client.id];
            console.log(`📢  Joueurs connecté : ${Object.keys(connected).length}`, game.players)
            client.broadcast.emit('player_disconnected',client.id)
            // leave game
            delete game.players[client.id];
            client.broadcast.emit('player_quit_game', client.id);
            client.broadcast.emit('players_count',Object.keys(connected).length-1)
        })
        client.on('quit_game', (player) => {
            delete game.players[client.id];
            client.broadcast.emit('player_quit_game', client.id);
        })
        client.on('join_game', (player) => {
            game.players[client.id] = player;
            player.id = client.id;
            _players = _.clone(game.players)
            delete _players[client.id]
            client.emit('players_list',_players)
            client.broadcast.emit('player_joined_game', player);
        })
        client.on('player_respawn', (player) => {
            client.broadcast.emit('player_respawned', client.id)
        });
        client.on('player_moving', (player) => {
            if(game.players[client.id]){
                game.players[client.id].x = player.x;
                game.players[client.id].y = player.y;
                game.players[client.id].rotation = player.rotation;
                game.players[client.id].textureKey = player.textureKey;
                player.id = client.id;
                client.broadcast.emit('player_moving', player)
            }
        })
        client.on('player_shooting', (config) => {
            client.broadcast.emit('player_shooting', config)
        })
        client.on('player_reloading', () => {
            client.broadcast.emit('player_reloading',client.id)
        })
        client.on('player_died', (o) => {
            game.players[o.killerId].score++
            client.broadcast.emit('player_died', {victim:client.id,killer:o.killerId})
        })
        client.on('player_revived', (player) => {
            client.broadcast.emit('player_revived', player)
        })
        client.on('init_index', () => {
            client.emit('players_count',Object.keys(connected).length-1)
        })
    })
}