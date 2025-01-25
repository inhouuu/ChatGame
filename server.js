const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

//instancias
const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'app/index.html'));
});


io.on('connection', (socket) => {
    // console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
});

server.listen(3000, () => {
    console.log('Servidor ON'); 
});
