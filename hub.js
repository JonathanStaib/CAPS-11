'use strict';

let eventPool = require('./eventPool');

require('./delivery');
require('./driver');

const vendorHandler = require('./vendor');

eventPool.on('PICKUP', (payload) => {
  console.log('EVENT:', { 
    event: 'pickup',
    date: new Date(),
    payload,
  });
});

eventPool.on('IN_TRANSIT', (payload) => {
  console.log('EVENT:', { 
    event: 'in-transit',
    date: new Date(),
    payload,
  });
});

eventPool.on('DELIVERED', (payload) => {
  console.log('EVENT:', { 
    event: 'delivered',
    date: new Date(),
    payload,
  });
});

eventPool.on('DELIVERED', vendorHandler);


// module.exports = (payload) => {

//   (eventPool.emit('DELIVERED', payload));
// };

// const vendorHandler = require('./vendor');


// eventPool.on('DELIVERED', vendorHandler);
