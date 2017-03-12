var sqlite3 = require('sqlite3').verbose();

var pg = require('pg-promise')();
var db = pg(process.env.DATABASE_URL);
// var db = pg({
//   user: '***REMOVED***',
//    password: "***REMOVED***",
//     database: "***REMOVED***",
//     port: 0 /***REMOVED***/,
//     host: "***REMOVED***",
//     ssl: true
// });

Promise.all([
  db.any('CREATE TABLE IF NOT EXISTS Nicknames (nick varchar(20) not null unique, battletag varchar(50) not null)'),
  db.any('CREATE TABLE IF NOT EXISTS Channel (id int primary key, channel varchar(20) not null)')
])
  .then((results) => {
    console.log('table created', results);
    // return db.any(`INSERT INTO Channel VALUES (1,'289018837100396545')`);
    //setChannel('289018837100396545')
  }).catch(err => {
    console.err(err);
  });

const addTag = (nick, tag) => {
  const stmt = `INSERT INTO Nicknames (nick, battletag) VALUES ('${nick}', '${tag}')`;
  console.log('trying to add tag: ', nick, tag, stmt);
  return db.none(stmt)
  .catch(err =>  {
    const update = `UPDATE Nicknames set battletag = '${tag}' WHERE nick = '${nick}'`;
    console.log(update)
    return db.none(update).catch(err => {
      console.log('error updating', err);
    })
  });
};

const getTag = (nick) => db.one(`SELECT * from Nicknames where nick = '${nick}' LIMIT 1`)
const getAll = () => db.any('SELECT * from Nicknames')
const deleteTag = (nick) => db.none(`DELETE from Nicknames WHERE nick = '${nick}'`)

const setChannel = channel => {
  const stmt = `UPDATE Channel set channel = '${channel}' where id = 1`;
  console.log('executing: ',stmt);
  return db.none(stmt);
}
const getChannel = () => db.one('SELECT channel from Channel where id = 1');

module.exports = {
  add: addTag,
  get: getTag,
  all: getAll,
  remove: deleteTag,
  getChannel: getChannel,
  setChannel: setChannel
}