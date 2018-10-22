const fs = require("fs");
const db_path = require('../../constants.js').CHART_CONF_JSON;
const MatcherSet = require('../models/matcherset.js');
const ChartDataModel = require('../models/chartdatamodel.js');
const MatcherSetRepository = require('../repository/matcherset.repository.js');

function jsonConf(){
    var contents = fs.readFileSync(db_path);
    return JSON.parse(contents);    
}

function getMatcherSetsFrom(sets){
    return sets.map( set => MatcherSet.create( set.name, set.matchers) ); 
}

function getAllFrom(conf){
    return conf.charts.map( chart => {
        let matchers = getMatcherSetsFrom( chart.matchersets );
        return new ChartDataModel(matchers,chart.type,chart.name,chart.width);
    });
}

module.exports = {getAllFrom, jsonConf};