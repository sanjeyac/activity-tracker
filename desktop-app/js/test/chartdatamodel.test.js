const Matcher = require('../models/matcher.js');
const DataInstant = require('../models/datainstant.js');
const MatcherSet = require('../models/matcherset.js');
const ChartDataModel = require('../models/chartdatamodel.js');


test('ChartModelData create a valid dataset for drawing a chart', () => {
    let matcherName = 'Firefox';
    let instant = new DataInstant('Mozilla Firefox', 1);
    let matcher = new Matcher('Firefox','Firefox Matcher name');
    let set = new MatcherSet(matcherName,[matcher]);
    let datamodel = new ChartDataModel([set],'pie','Firefox Data Model');
    let chartModel = datamodel.drawModel([instant]);
    expect( chartModel.labels[0]).toBe(matcherName);
});
