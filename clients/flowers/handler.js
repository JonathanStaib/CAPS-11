'use strict';

const Chance = require('chance');
const chance = new Chance();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const store = '1-800-flowers';

const generateOrder = (customer = undefined) => {

  let order = {
    store,
    id: chance.string({ length: 10, alpha: true, numeric: true }),
    customer: chance.name({ nationality: 'en' }),
    address: chance.address({ short_suffix: true }),
  };
  let payload = {
    event: 'PICKUP',
    messageId: order.id,
    queueId: store,
    order,
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
