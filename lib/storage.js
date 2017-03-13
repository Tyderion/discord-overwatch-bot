"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require('sqlite3').verbose();
var pg = require('pg-promise')();
// var db = pg(process.env.DATABASE_URL);
var db = pg({
    user: '***REMOVED***',
    password: "***REMOVED***",
    database: "***REMOVED***",
    port: 0 /***REMOVED***/,
    host: "***REMOVED***",
    ssl: true
});
Promise.all([
    db.any('CREATE TABLE IF NOT EXISTS Nicknames (nick varchar(20) not null unique, battletag varchar(50) not null)'),
    db.any('CREATE TABLE IF NOT EXISTS Channel (id int primary key, channel varchar(20) not null)')
])
    .then(function (results) {
    console.log('table created', results);
    // return db.any(`INSERT INTO Channel VALUES (1,'289018837100396545')`);
    //setChannel('289018837100396545')
}).catch(function (err) {
    console.err(err);
});
exports.addTag = function (nick, tag) {
    var stmt = "INSERT INTO Nicknames (nick, battletag) VALUES ('" + nick + "', '" + tag + "')";
    console.log('trying to add tag: ', nick, tag, stmt);
    return db.none(stmt)
        .catch(function (err) {
        var update = "UPDATE Nicknames set battletag = '" + tag + "' WHERE nick = '" + nick + "'";
        console.log(update);
        return db.none(update).catch(function (err) {
            console.log('error updating', err);
        });
    });
};
exports.getTag = function (nick) { return db.one("SELECT * from Nicknames where nick = '" + nick + "' LIMIT 1"); };
exports.getAll = function () { return db.any('SELECT * from Nicknames'); };
exports.deleteTag = function (nick) { return db.none("DELETE from Nicknames WHERE nick = '" + nick + "'"); };
exports.setChannel = function (channel) {
    var stmt = "UPDATE Channel set channel = '" + channel + "' where id = 1";
    console.log('executing: ', stmt);
    return db.none(stmt);
};
exports.getChannel = function () { return db.one('SELECT channel from Channel where id = 1'); };
//# sourceMappingURL=storage.js.map