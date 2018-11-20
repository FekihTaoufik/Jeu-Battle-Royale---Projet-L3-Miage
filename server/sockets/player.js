const _ = require('lodash');
const mo = require('moment');
module.exports = (io) => {
    io.on('connect',function(client){
        console.log("CLIENT CONNECTED");
        client.on('player_moving',(player)=>{
            client.broadcast('player_moving',player);
        });
        client.on('player_shooting',(o)=>{
            //var  o = { player : player , bullet : bullet};
            client.broadcast('player_shooting',o);
        });
        client.on('player_died',(player)=>{
            client.broadcast('player_died',player);
        });
        client.on('player_revived',(player)=>{
            client.broadcast('player_revived',player);
        });
    })
}