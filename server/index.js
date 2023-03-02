'use strict';

// let eventPool = require('../eventPool');
require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const capsQueue = new Queue();

const server = new Server(PORT);

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace!', socket.id);
  socket.onAny((event, payload) => {
    const time = new Date();
    const messageId = payload.messageId;
    console.log('EVENT:', { event, time, messageId, payload });
  });

  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined the ${room} room!`);
  });
  socket.on('PICKUP', (payload) => {
    let pickupQueue = capsQueue.read('driver');
    if (!pickupQueue) {
      let pickupKey = capsQueue.store('driver', new Queue);
      pickupQueue = capsQueue.read(pickupKey);
    }
    pickupQueue.store(payload.messageId, payload);
    socket.broadcast.emit('PICKUP', payload);
  }, 1000);

  socket.on('IN_TRANSIT', (payload) => {

    socket.broadcast.emit('IN_TRANSIT', payload);
  }, 1000);

  socket.on('DELIVERED', (payload) => {
    let vendorQueue = capsQueue.read(payload.queueId);
    if (!vendorQueue) {
      let vendorKey = capsQueue.store(payload.queueid, new Queue);
      vendorQueue = capsQueue.read(vendorKey);
    }
    vendorQueue.store(payload.messageId, payload);
    socket.to(payload.queueId).emit('DELIVERED', payload);
  }, 1000);

  socket.on('RECEIVED', (payload) => { 
    
    // send queue data to a single room
    // socket.to(payload.room).emit('RECEIVED', payload);
    let currentQueue = capsQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('we have messages with no queue');
    } 
    let message = currentQueue.remove(payload.messageId);
    console.log(message);
    socket.broadcast.emit('RECEIVED', message);
  });

  socket.on('GET-ALL', (payload) => {
    console.log('--- get all event ---');
    let currentQueue = capsQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit(payload.event, currentQueue.read(messageId));
      });
    }
  });

});

