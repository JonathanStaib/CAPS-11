'use strict';

const Chance = require('chance');
const chance = new Chance();

const generateOrder = (socket, customer = undefined) => {
  let payload = {};
  if( customer === undefined){
    payload = {
      store: chance.company(),
      id: chance.string({ length: 10, alpha: true, numeric: true }),
      customer: chance.name({ nationality: 'en' }),
      address: chance.address({ short_suffix: true }),
    };
  } else{
    payload = {
      store: '1-800-flowers',
      customer: 'jonny',
      id: '1r2d3a4',
      address: 'store',
    };
  }
  chance.string();

  console.log('VENDOR: package ready for pickup');
  socket.emit('PICKUP', payload);
  return payload;
};

const delivered = (payload) => {
  console.log(`VENDOR: Thank you for delivering to ${payload.customer}`);
};

module.exports = { delivered, generateOrder };
