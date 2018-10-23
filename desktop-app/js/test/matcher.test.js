const Matcher = require('../models/matcher.js');
const DataInstant = require('../models/datainstant.js');


test('matcher with regex "firefox" on instant "Mozilla Firefox"', () => {
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher('Firefox','Firefox Matcher name');
    expect(matcher.match(instant)).toBe(true);
});


test('matcher with case insensitive regex "firefox" on instant "Mozilla Firefox"', () => {
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher(/firefox/gi,'Firefox Matcher name');
    expect(matcher.match(instant)).toBe(true);
});


test('matcher with case insensitive regex as string "firefox" on instant "Mozilla Firefox"', () => {
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher('/firefox/gi','Firefox Matcher name');
    expect(matcher.match(instant)).toBe(true);
});


test('empty matcher should not work with empty regex', () => {
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher('','Firefox Matcher name');
    expect(matcher.match(instant)).toBe(false);
});


test('empty matcher should not work with null regex', () => {
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher(null,'Firefox Matcher name');
    expect(matcher.match(instant)).toBe(false);
});