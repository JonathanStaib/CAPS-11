'use strict';

// let eventPool = require('../eventPool');
require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server();

require('../delivery');
require('../driver');

const vendorHandler = require('../vendor');

server.on('connection', (socket) => {
  console.log('Socket connected to Event server!', socket.id);

socket.on('PICKUP', (payload) => {
  console.log('EVENT:', { 
    event: 'pickup',
    date: new Date(),
    payload,
  });
});

socket.on('IN_TRANSIT', (payload) => {
  console.log('EVENT:', { 
    event: 'in-transit',
    date: new Date(),
    payload,
  });
});

socket.on('DELIVERED', (payload) => {
  console.log('EVENT:', { 
    event: 'delivered',
    date: new Date(),
    payload,
  });
});

}

eventPool.on('DELIVERED', vendorHandler);


// module.exports = (payload) => {

//   (eventPool.emit('DELIVERED', payload));
// };

// const vendorHandler = require('./vendor');


// eventPool.on('DELIVERED', vendorHandler);
