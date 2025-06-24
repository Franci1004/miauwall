const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Statische Dateien (HTML, CSS, JS, Sounds, Images)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('🎉 Nutzer verbunden');

  socket.on('spawnCat', (cat) => {
    socket.broadcast.emit('spawnCat', cat); // an alle anderen schicken
  });
});

http.listen(3000, () => {
  console.log('🚀 Server läuft auf http://localhost:3000');
});
