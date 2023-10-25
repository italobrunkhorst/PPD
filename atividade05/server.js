/*const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const { Socket } = require('dgram')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

server.listen(3000)
app.use(express.static(path.join(__dirname, 'public')))
let connectedUsers = []

io.on('connection', (socket) => {
    console.log("Conexão detectada...")

    socket.on('join-request', (username) => {
        socket.username = username
        connectedUsers.push(username)
        console.log(connectedUsers)

        socket.emit('user-ok', connectedUsers)
        socket.broadcast.emit('list-update', {
            joined: username,
            list: connectedUsers
        })
    })

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(u => u != socket.username)
        console.log(connectedUsers)

        socket.broadcast.emit('list-update', {
            left: socket.username,
            list: connectedUsers
        })
    })

    socket.on('send-msg', (txt) => {
        let obj ={
            username: socket.username,
            message: txt
        }
        socket.broadcast.emit('show-msg', obj)
    })
})*/
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));

// Estrutura para armazenar informações das salas
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('Conexão detectada...');

    socket.on('join-room', (room, username) => {
        if (!rooms.has(room)) {
            rooms.set(room, []);
        }

        rooms.get(room).push({
            username,
            socket
        });

        const usersInRoom = rooms.get(room).map(user => user.username);
        socket.join(room);

        socket.emit('user-ok', usersInRoom);

        io.to(room).emit('user-joined', username, usersInRoom);

        socket.on('send-msg', (msg) => {
            io.to(room).emit('show-msg', username, msg);
        });

        socket.on('disconnect', () => {
            const users = rooms.get(room).filter(user => user.username !== username);
            rooms.set(room, users);
            const usersInRoom = users.map(user => user.username);
            io.to(room).emit('user-left', username, usersInRoom);
        });
    });
});
