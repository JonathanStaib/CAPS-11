'use strict';

const socket = require('../socket');
const {generateOrder, delivered} = require('./handler');

jest.mock('../socket.js', () => {
  return{
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe(' Handle Vendor', () => {
  let payload = {
    store: '1-800-flowers',
    id: '1r2d3a4',
    customer: 'jonny',
    address: 'store',
  };

  it('creates payload and emits pickup', () => {
    generateOrder(socket, payload);
    expect(console.log).toHaveBeenCalledWith('VENDOR: package ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);
  });

  it('thanks the driver for delivery', () => {
    delivered(payload);
    expect(console.log).toHaveBeenCalledWith(`Vendor: thank you for delivering to ${payload.customer}`);
  });

});