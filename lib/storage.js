"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require('sqlite3').verbose();
var pg = require('pg-promise')();
var index_1 = require("./index");
var logger = index_1.getLogger('storage');
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
    logger.info('tables created');
    // return db.any(`INSERT INTO Channel VALUES (1,'289018837100396545')`);
    //setChannel('289018837100396545')
}).catch(function (err) {
    logger.error(err);
});
exports.addTag = function (nick, tag) {
    var stmt = "INSERT INTO Nicknames (nick, battletag) VALUES ('" + nick + "', '" + tag + "')";
    logger.info("adding tag: " + stmt);
    return db.none(stmt)
        .catch(function (err) {
        var update = "UPDATE Nicknames set battletag = '" + tag + "' WHERE nick = '" + nick + "'";
        logger.info('tag already exists, updating: ', update);
        return db.none(update).catch(function (err) {
            logger.log('error updating', err);
        });
    });
};
exports.getTag = function (nick) {
    var stmt = "SELECT * from Nicknames where nick = '" + nick + "' LIMIT 1";
    logger.info('Getting Tag: ', stmt);
    return db.one(stmt);
};
exports.getAll = function () {
    var stmt = 'SELECT * from Nicknames';
    logger.info("Loading all nicknames: " + stmt);
    return db.any(stmt);
};
exports.deleteTag = function (nick) {
    var stmt = "DELETE from Nicknames WHERE nick = '" + nick + "'";
    logger.info("Removing " + nick + " from the database.: " + stmt);
    return db.none(stmt);
};
exports.setChannel = function (channel) {
    var stmt = "UPDATE Channel set channel = '" + channel + "' where id = 1";
    logger.info('Setting channel: ', stmt);
    return db.none(stmt);
};
exports.getChannel = function () {
    var stmt = 'SELECT channel from Channel where id = 1';
    logger.info('Getting Channel: ', stmt);
    return db.one(stmt);
};
//# sourceMappingURL=storage.js.map