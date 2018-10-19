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
                    resolve(rows);
                }
            });
        });
        db.close();
    })
}

module.exports = {
    getAll: getAll
}