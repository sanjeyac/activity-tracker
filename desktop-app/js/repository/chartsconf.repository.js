const fs = require("fs");
const db_path = require('../constants.js').CHART_CONF_JSON;

function loadFromFile(){
    var contents = fs.readFileSync(db_path);
    return JSON.parse(contents);
}

module.exports = {loadFromFile};