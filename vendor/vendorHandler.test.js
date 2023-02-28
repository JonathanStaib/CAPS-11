'use strict';

// const eventPool = require('../eventPool');
const handler = require('./handler');

// jest.mock('../eventPool.js', () => {
//   return{
//     on: jest.fn(),
//     emit: jest.fn(),
//   };
// });

describe(' Handle Eyes', () => {
  it('logs delivery response from vendor', () => {
    const payload = {id:'sadnyasd87'};
    handler(payload);
    expect(console.log).toHaveBeenCalledWith(`Vendor: thank you for delivering order ${payload.id}`);
  });
});