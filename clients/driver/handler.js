'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');


const pickup = (payload) => {
  console.log(`DRIVER: picked up package.`);
  socket.emit('IN_TRANSIT', payload);
  socket.emit('RECEIVED', {queueId: 'driver', messageId: payload.messageId});

  // setTimeout(() => {
  //   socket.emit('DELIVERED', payload);
  // }, 2000);
};
// let time = new Date();

const delivered = (payload) => {
  console.log(`DRIVER: delivered package`);
  socket.emit('DELIVERED', {payload, event: 'DELIVERED'});
};

// module.exports = { pickup, delivered };
module.exports = { pickup, delivered };