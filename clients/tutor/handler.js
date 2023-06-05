'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/chat');

const tutorQuestionHandler = (question) => {
  console.log(`Question from tutor: ${question}`);

  // Emit the 'question' event to the server with the tutor's question
  socket.emit('question', question);
};

module.exports = tutorQuestionHandler;
