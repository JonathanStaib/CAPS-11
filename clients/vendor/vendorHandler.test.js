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
  it('creates payload and emits pickup', () => {
    const payload = {
      store: '1-800-flowers',
      customer: 'jonny',
      id: '1r2d3a4',
      address: 'store',
    };
    let myObj = generateOrder(socket, 'jonny');
    expect(console.log).toHaveBeenCalledWith('VENDOR: package ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);
    expect(myObj.store).toEqual('1-800-flowers');
  });

  it('thanks the driver for delivery', () => {
    const payload = {customer: 'jonny'};
    delivered(payload);
    expect(console.log).toHaveBeenCalledWith(`VENDOR: Thank you for delivering to ${payload.customer}`);
  });

});