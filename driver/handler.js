'use strict';

const eventPool = require('../eventPool');

const pickup = (payload) => {
  console.log(`DRIVER: picked up ${payload.id} at ${payload.address}`);
  eventPool.emit('IN_TRANSIT', payload);
  setTimeout(() => {
    eventPool.emit('DELIVERED', payload);
  }, 1500);
};

let time = new Date();

const delivered = (payload) => {
  console.log(`DRIVER: delivered ${payload.id} at ${payload.address} on ${time}`);
};

module.exports = { pickup, delivered };