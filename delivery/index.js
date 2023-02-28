'use strict';

const eventPool = require('../eventPool');
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
  eventPool.emit('PICKUP', customer);
}, 5000);