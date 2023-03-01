'use strict';

const Chance = require('chance');
const chance = new Chance();

const generateOrder = (socket) => {

  let payload = {
    store: chance.company(),
    id: chance.string({ length: 10, alpha: true, numeric: true }),
    customer: chance.name({ nationality: 'en' }),
    address: chance.address({ short_suffix: true }),
  };
  chance.string();

  console.log('VENDOR: package ready for pickup');
  socket.emit('PICKUP', payload);
};

const delivered = (payload) => {
  console.log(`VENDOR: Thank you for delivering to ${payload.customer}`);
};

module.exports = { delivered, generateOrder };
