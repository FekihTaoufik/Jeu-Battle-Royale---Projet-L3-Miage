var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require("socket.io")(server);
require("./sockets/index.js")(io);
app.set('socketio', io);

const path = require('path');

app.use('/assets',express.static(path.resolve('client/src/assets')));
app.use('/vendors',express.static(path.resolve('node_modules')));


app.get('/',function(req,res){
    res.sendFile(path.resolve('client/index.html'));
});


server.listen(process.env.PORT || 8081,function(){
    console.log(`Listening on http://localhost:${server.address().port}`);
});