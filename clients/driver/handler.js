'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

const pickup = (payload) => {
  console.log(`DRIVER: picked up ${payload.id} at ${payload.address}`);
  socket.emit('IN_TRANSIT', payload);

  // setTimeout(() => {
  //   socket.emit('DELIVERED', payload);
  // }, 2000);
};

let time = new Date();

const delivered = (payload) => {
  console.log(`DRIVER: delivered ${payload.id} at ${payload.address} on ${time}`);
  socket.emit('DELIVERED', payload);
};

// module.exports = { pickup, delivered };
module.exports = { pickup, delivered };