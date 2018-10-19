const Matcher = require('../models/matcher.js');
const DataInstant = require('../models/datainstant.js');
const MatcherSet = require('../models/matcherset.js');
const MatcherSetRepository = require('../repository/matcherset.repository.js');



test('Load MatcherSets from configuration', () => {

    let instants = [ new DataInstant('Mozilla Firefox', 1), new DataInstant('Chromium Browser', 2),  new DataInstant('Unknown Browser', 3) ];

    let conf = {
        charts: [{
            name: 'Browsers',
            type: '',
            matchersets: [{
                name: 'Firefox',
                matchers: ['Firefox']
            }, {
                name: 'Chromium',
                matchers: ['Firefox']
            }]
        }]

    }; 
    // expected output: Browsers { Firefox: 1, Chromium: 1}    

    let sets = MatcherSetRepository.getAllFrom(conf);
    let chartModel = sets[0].drawModel(instants);    

    expect( chartModel.values[0] ).toBe(1);
    expect( chartModel.values[1] ).toBe(1);
});