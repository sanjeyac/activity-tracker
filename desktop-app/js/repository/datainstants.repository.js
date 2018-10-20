const DataInstant = require('../models/datainstant.js');
const db_path = require('../../constants.js').SQLITE_DB;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(db_path);

function getAll() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all("SELECT unixtime, window FROM activity",(err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let instants = rows.map( row => new DataInstant(row.window, row.unixtime));
                    resolve(instants);
                }
            });
        });
        db.close();
    })
}

module.exports = {
    getAll: getAll
}