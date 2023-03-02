'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const { pickup, delivered } = require('./handler');

socket.emit('GET_ALL', { queueId: 'driver'});

socket.on('PICKUP', (payload) => {
  setTimeout(() => {
    pickup(payload);
  }, 1000);
  // setTimeout(() => {
  //   delivered(payload);
  // }, 2000);
});

socket.on('IN_TRANSIT', (payload) => {
  setTimeout(() => {
    delivered(payload);
  }, 1000);
});

// eventPool.on('IN_TRANSIT', driverHandler);

// (payload) => {
//   setTimeout(() => {
//     pickup(payload);
//   }, 900);
// };