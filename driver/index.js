'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');
const {pickup, delivered} = require('./handler');

socket.on('PICKUP', (payload) => {
  setTimeout(() => {
    pickup(payload);
  }, 1500);
});

// socket.on('DELIVERED', (payload) => {
//   setTimeout(() => {
//     delivered(payload);
//   }, 1500);
// });

// eventPool.on('IN_TRANSIT', driverHandler);

// (payload) => {
//   setTimeout(() => {
//     pickup(payload);
//   }, 900);
// };