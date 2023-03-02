'use strict';

// const socket = require('../socket');
const {pickup, delivered} = require('./handler');

jest.mock('../socket.js', () => {
  return{
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe(' Handle Driver', () => {
  it('logs pickup and emits transit', () => {
    const payload = {
      store: '1-800-flowers',
      customer: 'jonny',
      id: '1r2d3a4',
      address: 'store',
    };
    pickup(payload);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${payload.id} at ${payload.address}`);
  });

  it('logs delivery', () => {
    const payload = {id: 'e42fR4', address: '24 note rd'};
    let time = new Date();
    delivered(payload);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${payload.id} at ${payload.address} on ${time}`);
  });

});