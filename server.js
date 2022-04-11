const EXPRESS = require('express');
const SOCKET = require('socket.io');
const APP = EXPRESS();
const SERVER = APP.listen(8080);

APP.use(EXPRESS.static('./public'));

const IO  = SOCKET(SERVER);
let users = {};

IO.on('connection', (socket) => {
    socket.on('newuser', function(data){
        users[socket.id] = data;
        IO.sockets.emit('newuser',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });

    socket.on('message', function(data){
        IO.sockets.emit('message',data);
    })

    socket.on('disconnect', ()=>{
        IO.sockets.emit('left',users[socket.id]);
    })
});