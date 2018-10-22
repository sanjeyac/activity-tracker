const DataInstant = require('../models/datainstant.js');
const db_path = require('../../constants.js').SQLITE_DB;
var sqlite3 = require('sqlite3').verbose();


function getAll() {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(db_path);
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

function getBetween(timeFrom,timeTo) {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(db_path);
        db.serialize(() => {

            let stmt = db.prepare("SELECT unixtime, window FROM activity WHERE unixtime > ? and unixtime < ?");
            stmt.all(timeFrom,timeTo, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let instants = rows.map( row => new DataInstant(row.window, row.unixtime));
                    resolve(instants);
                }
                stmt.finalize();
            });
        });
        db.close();
    })
}


module.exports = {
    getAll: getAll,
    getBetween: getBetween
}