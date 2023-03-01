'use strict';

const eventPool = require('../eventPool');
const {pickup, delivered} = require('./handler');

jest.mock('../eventPool.js', () => {
  return{
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe(' Handle Driver', () => {
  it('logs pickup and emits transit', () => {
    const payload = {id: 'e42fR4', address: '24 note rd'};
    pickup(payload);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${payload.id} at ${payload.address}`);
    expect(eventPool.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
  });

  it('logs delivery', () => {
    const payload = {id: 'e42fR4', address: '24 note rd'};
    let time = new Date();
    delivered(payload);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${payload.id} at ${payload.address} on ${time}`);
  });

});