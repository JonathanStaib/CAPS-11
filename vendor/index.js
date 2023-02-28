'use strict';

// const eventPool = require('../eventPool');
const handler = require('./handler');

// eventPool.on('DELIVERED', (payload) => {
//   setTimeout(() => {
//     delivered(payload);
//   }, 1100);
// });

module.exports = (payload) => {
  setTimeout(() => {
    handler(payload);
  }, 1000);
};