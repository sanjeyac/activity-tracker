const Matcher = require('../models/matcher.js');
const DataInstant = require('../models/datainstant.js');

test('matcher with regex "firefox" on instant "Mozilla Firefox"', () => {

    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher('firefox','Firefox');

    expect(matcher.match(instant)).toBe(true);
});