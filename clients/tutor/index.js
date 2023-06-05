'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/chat');
const tutorQuestionHandler = require('./handler');


// Event listener for the 'connect' event
socket.on('connect', () => {
  console.log('Connected to chat server');

  // Emit the 'join' event to join as a tutor
  socket.emit('join');

});

// Event listener for the 'joined' event from the server
socket.on('joined', () => {
  console.log('Joined as tutor');

  // Emit a question to the customer
  const tutorQuestion = 'How can I assist you?';
  tutorQuestionHandler(tutorQuestion);

});

// Event listener for the 'help' event from the server
socket.on('help', (message) => {
  console.log(`Received help message from customer: ${message}`);
  // Handle the help message from the customer
});

// Event listener for the 'answer' event from the server
socket.on('answer', (response) => {
  console.log(`Answer from customer: ${response}`);
  // Handle the answer from the customer here
});
