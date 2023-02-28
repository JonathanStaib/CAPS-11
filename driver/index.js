'use strict';

const eventPool = require('../eventPool');
const {pickup, delivered} = require('./handler');

eventPool.on('PICKUP', (payload) => {
  setTimeout(() => {
    pickup(payload);
  }, 1000);
});

eventPool.on('DELIVERED', (payload) => {
  setTimeout(() => {
    delivered(payload);
  }, 1000);
});

// eventPool.on('IN_TRANSIT', driverHandler);

// (payload) => {
//   setTimeout(() => {
//     pickup(payload);
//   }, 900);
// };