const fs = require("fs");
const db_path = require('../constants.js').CHART_CONF_JSON;

/**
* charts: [{
*       name: 'Browsers'    
        type: ''
*       matchersets: [{
            name: 'Firefox'
            matchers: ['Firefox']
*       }]
*     }
* ]
*/
function jsonConf(){
    var contents = fs.readFileSync(db_path);
    return JSON.parse(contents);    
}

function getMatcherSetsFrom(sets){
    return sets.map( set => MatcherSet.create( set.name, set.matchers) ); 
}

function getAllFrom(conf){
    conf.charts.map( chart => {
        let matchers = getMatcherSetsFrom( chart.matchersets );
        return new ChartDataModel([set],chart.type,chart.name);
    })
}

module.exports = {getAllFrom, jsonConf};