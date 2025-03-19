require('dotenv').config(); // Loads environment variables from .env
const app = require('./app');
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: "*" } });

global.io = io;

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
