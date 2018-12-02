var express = require('express');
var app = express();
var server = require('http').Server(app);
const ENV = process.env.NODE_ENV || 'development';

var io = require("socket.io")(server);
require("./sockets/index.js")(io);
app.set('socketio', io);

const path = require('path');
app.use('/assets',express.static(path.resolve('./client/src/assets')));
if(ENV == 'development')
    app.use('/src',express.static(path.resolve('./client/dist/src')));
    else
    app.use('/',express.static(path.resolve('./client/dist')));


app.get('/',function(req,res){
    res.sendFile(path.resolve('./client/dist/index.html'));
});


server.listen(9000,function(){
    console.log(`Serveur démarré, http://localhost:${server.address().port}`);
});