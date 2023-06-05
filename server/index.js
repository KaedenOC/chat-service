'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server();

server.listen(PORT);

server.on('MESSAGE', () => {
  console.log('SERVER: Message Event');
});
