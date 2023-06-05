'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/chat');

// Event listener for the 'connect' event
socket.on('connect', () => {
  console.log('Connected to chat server');

  // Emit the 'help' event with the help message
  const helpMessage = 'I need help!';
  socket.emit('help', helpMessage);
  console.log(`Sent help message: ${helpMessage}`);
});

// Event listener for the 'question' event from the server
socket.on('question', (question) => {
  console.log(`Question from tutor: ${question}`);

  // Emit the 'response' event to the server with the customer's response
  const customerResponse = 'I need help with my order.';
  socket.emit('response', customerResponse);
});

// Event listener for the 'answer' event from the server
socket.on('answer', (response) => {
  console.log(`Answer from tutor: ${response}`);
  // Handle the answer from the tutor here
});


// Event listener for the 'joined' event from the server
socket.on('joined', () => {
  console.log('Joined as customer');
});


