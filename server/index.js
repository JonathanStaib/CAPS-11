'use strict';

// let eventPool = require('../eventPool');
require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace!', socket.id);
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT:', { event, time, payload });
  });
  socket.on('PICKUP', (payload) => {
    // console.log('EVENT:', {
    //   event: 'pickup',
    //   date: new Date(),
    //   payload,
    // });
    socket.broadcast.emit('PICKUP', payload);
  }, 1000);

  socket.on('IN_TRANSIT', (payload) => {
    // console.log('EVENT:', { 
    //   event: 'in-transit',
    //   date: new Date(),
    //   payload,
    // });
    socket.broadcast.emit('IN_TRANSIT', payload);
  }, 1000);

  socket.on('DELIVERED', (payload) => {
    socket.broadcast.emit('DELIVERED', payload);
  }, 1000);
});

// server.listen(PORT);
