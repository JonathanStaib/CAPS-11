'use strict';

// const eventPool = require('../eventPool');
const { io } = require('socket.io-client');
const {delivered, generateOrder} = require('./handler');

const socket = io('http://localhost:3001/caps');
const store = 'widgets';

socket.emit('JOIN', store);
socket.emit('GET_ALL', { queueId: store});

setInterval(() => {
  console.log('---new interval begins---');
  generateOrder(socket);
}, 9000);

socket.on('DELIVERED', (payload) => {
  setTimeout(() => {
    delivered(payload);
  }, 1100);
});