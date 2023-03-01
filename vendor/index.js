'use strict';

// const eventPool = require('../eventPool');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');
// const {delivered} = require('./handler');

const Chance = require('chance');

const chance = new Chance();

var customer = {
  store: chance.company(),
  id: chance.string({ length: 10, alpha: true, numeric: true }),
  customer: chance.name({ nationality: 'en' }),
  address: chance.address({ short_suffix: true }),
};
chance.string();

setInterval(() => {
  console.log('---new interval begins---');

  console.log('package ready for pickup');
  socket.emit('PICKUP', customer);
}, 5000);

// socket.on('DELIVERED', (payload) => {
//   setTimeout(() => {
//     delivered(payload);
//   }, 1000);
// });



// socket.on('DELIVERED', (payload) => {
//   setTimeout(() => {
//     delivered(payload);
//   }, 1100);
// });