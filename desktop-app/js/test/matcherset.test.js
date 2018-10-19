const Matcher = require('../models/matcher.js');
const DataInstant = require('../models/datainstant.js');
const MatcherSet = require('../models/matcherset.js');


test('MatcherSet with one matcher "firefox" on one instant "Mozilla Firefox" should count 1', () => {
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher('Firefox','Firefox Matcher name');
    let set = new MatcherSet('Firefox',[matcher]);
    let computation = set.count([instant]);    
    expect( computation ).toBe(1);
});


test('MatcherSet create a matcher set with two matchers', () => {
    let set = MatcherSet.create('Browsers', ['Firefox','Chromium']);
    expect( set.matchers.length ).toBe(2);
});


test('MatcherSet with one matcher "firefox" on one instant "Mozilla Firefox" should count 1', () => {
    let instants = [ new DataInstant('Mozilla Firefox', 1), new DataInstant('Chromium Browser', 2),  new DataInstant('Unknown Browser', 3) ];
    let set = MatcherSet.create('Browsers', ['Firefox','Chromium']);
    let computation = set.count(instants);    
    expect( computation ).toBe(2);
});
