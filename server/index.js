'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server();

console.log('listening on port:', PORT);
server.listen(PORT);

// function logger(event, payload) {
//   const timestamp = new Date();
//   console.log('EVENT: ', { event, timestamp, payload });
// }

// Namespace for customer and tutor
const chatNamespace = server.of('/chat');
chatNamespace.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Event listener for the 'help' event from the customer
  socket.on('help', (message) => {
    console.log(`Help message from customer: ${message}`);

    // Broadcast the help message to all connected tutors
    chatNamespace.emit('help', message);
  });

  // Event listener for the 'join' event from the tutor
  socket.on('join', () => {
    console.log('Tutor joined:', socket.id);

    // Emit a 'joined' event to the tutor to acknowledge their joining
    socket.emit('joined');
  });

  // Event listener for the 'question' event from the tutor
  socket.on('question', (question) => {
    console.log(`Question from tutor: ${question}`);

    // Emit the 'response' event to the customer to ask for their response
    socket.broadcast.emit('response', question);
  });

  // Event listener for the 'response' event from the customer
  socket.on('response', (response) => {
    console.log(`Response from customer: ${response}`);
    // Handle the response from the customer here

    // Emit the 'answer' event to the tutor with the customer's response
    socket.broadcast.emit('answer', response);
  });

  // Event listener for the 'disconnect' event from the user
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



