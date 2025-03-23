const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const path = require("path");

//instancias
const app = express();
const server = createServer(app);
const io = new Server(server);
const routes = require("./routes/index");

app.use(express.static(path.join(__dirname, "../public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

//rotas
app.use(routes);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join romm', (data) => {
        if (!rooms.find(e => e.id == data.id)) return;
        rooms.push(data);
        socket.join(data.id);
        io.to(data.id).emit("entrou na sala", 'msg');
        console.log('Sala::', data);
    });

    // socket.on('list rooms', (msg) => {
    //     console.log('message: ' + rooms);
    //     io.emit('list rooms', rooms);
    // });
});

server.listen(3000, () => {
    console.log('Servidor ON');
});
