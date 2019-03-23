const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

let players = {};

io.on('connection', function (socket) {
    console.log('a user connected: ', socket.id);
    players = {...players, [socket.id]: {hp: 50}};

    io.emit('player change', players);

    socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);
        const playersClone = players = {...players};
        delete playersClone[socket.id];
        players = playersClone;

        io.emit('player change', players);
    });

    socket.on('request players', () => {
        io.to(socket.id).emit('player change', players);
    });

    socket.on('mistype', () => {
        players = {...players, [socket.id]: {hp: players[socket.id].hp - 1}}
        io.emit('player change', players);
    });
});

http.listen(port, () => console.log(`Listening on port ${port}`));

