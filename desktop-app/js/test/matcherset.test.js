const Matcher = require('../models/matcher.js');
const DataInstant = require('../models/datainstant.js');
const MatcherSet = require('../models/matcherset.js');


test('matcher with regex "firefox" on instant "Mozilla Firefox"', () => {
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher('Firefox','Firefox Matcher name');
    let set = new MatcherSet('Firefox',[matcher]);
    let computation = set.getCounts([instant]);    
    expect( computation[0].value ).toBe(1);
});
