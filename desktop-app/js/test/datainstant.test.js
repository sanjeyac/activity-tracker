const DataInstant = require('../models/datainstant.js');
const moment = require('moment');

test('data instant of today event', () => {
    let todayUnix = moment().unix();
    let instant = new DataInstant('Mozilla Firefox', todayUnix);
    expect(instant.isToday()).toBe(true);
});

test('data instant of yesterday event', () => {
    let todayUnix = moment().add(-1, 'days').unix();
    let instant = new DataInstant('Mozilla Firefox', todayUnix);
    expect(instant.isToday()).toBeFalsy();
});


test('min of null is null', () => {
    expect(DataInstant.minOf(null)).toBe(null);
});

test('min of empty array is null', () => {
    expect(DataInstant.minOf(null)).toBe(null);
});

test('max of empty array is null', () => {
    expect(DataInstant.maxOf(null)).toBeNull();
});

test('max of null is null', () => {
    expect(DataInstant.maxOf(null)).toBeNull();
});

test('min of instants', () => {
    let instants = [
        new DataInstant('A window', 1),
        new DataInstant('A window', 2)
    ];
    expect(DataInstant.minOf(instants)).toBe(1);
});

test('max of instants', () => {
    let instants = [
        new DataInstant('A window', 1),
        new DataInstant('A window', 2)
    ];
    expect(DataInstant.maxOf(instants)).toBe(2);
});
