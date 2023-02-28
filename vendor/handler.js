'use strict';

// const eventPool = require('../eventPool');

module.exports = (payload) => {
  console.log(`Vendor: thank you for delivering order ${payload.id}`);
};

// const delivered = (payload) => {
//   console.log(`VENDOR: Thank you for delivering ${payload.id}`);
// };

// module.exports = delivered;
