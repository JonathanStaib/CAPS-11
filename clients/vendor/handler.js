'use strict';

const Chance = require('chance');
const chance = new Chance();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

const generateOrder = (customer = undefined) => {

  let payload = {
    store: chance.company(),
    id: chance.string({ length: 10, alpha: true, numeric: true }),
    customer: chance.name({ nationality: 'en' }),
    address: chance.address({ short_suffix: true }),
  };

  chance.string();

  console.log('VENDOR: package ready for pickup');
  socket.emit('PICKUP', payload);
  return payload;
};

const delivered = (payload) => {
  console.log(`VENDOR: Thank you for delivering to ${payload.customer}`);
  socket.emit('RECEIVED', payload);
};

module.exports = { delivered, generateOrder };
