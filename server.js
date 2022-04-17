const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const fs = require('fs');

let players = {};
let textList = [];
let currentParagraph = 0;

fs.readFile('texts/mural.txt', 'utf8', function (err, data) {
  if (err) throw err;
  textList = data.split('\n\n').map(t =>
    t.replace(/([a-zA-Z])\n/g, '$1. ').replace(/\n/g, ' ')
  );
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);

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
    const player = players[socket.id];
    players = {...players, [socket.id]: {...player, hp: player.hp - 1}};
    if (player.hp <= 0) {
      player.hasLost = true;
    }

    io.emit('player change', players);
  });

  socket.on('type', () => {
    const curPlayer = players[socket.id];
    const newIndex = curPlayer.currentIndex + 1;
    if (newIndex === textList[currentParagraph].length) {
      handleParagraphCompletion();
    } else {
      curPlayer.currentIndex++;

      io.emit('player change', players);
    }
  });

  socket.on('start', () => {
    io.emit('game start', textList[currentParagraph]);
  });

  socket.on('player join', (name) => {
    players = {...players, [socket.id]: {hp: 50, currentIndex: 0, hasLost: false, name}};

    io.emit('player change', players);
  });

  function handleParagraphCompletion() {
    Object.keys(players).forEach((id) => {
      if (id !== socket.id) {
        const damage = textList[currentParagraph].length - players[id].currentIndex;
        players[id].hp -= damage;
        if (players[id].hp <= 0) {
          players[id].hasLost = true;
        }
      }

      players[id].currentIndex = 0;
    });

    currentParagraph++;

    io.emit('player change', players);
    io.emit('game start', textList[currentParagraph]);
  }
});

http.listen(port, () => console.log(`Listening on port ${port}`));

