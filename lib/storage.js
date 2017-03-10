var sqlite3 = require('sqlite3').verbose();

var pg = require('pg-promise')();
var db = pg(process.env.DATABASE_URL);
Promise.all([
  db.none('CREATE TABLE IF NOT EXISTS Nicknames (nick varchar(20) not null unique, battletag varchar(50) not null)'),
  db.none('CREATE TABLE IF NOT EXISTS Channel (channel varchar(20) not null, id int primary key)')
])
.then(() => {
  console.log('table created');
  setChannel('289018837100396545')
}).catch(err => {
  console.err(err);
});

const addTag = (nick, tag) => {
  const stmt = `INSERT INTO Nicknames VALUES ('${nick}', '${tag}')`;
  console.log('trying to add tag: ', nick, tag, stmt);
  return db.none(stmt);
};

const getTag = (nick) => db.one(`SELECT * from Nicknames where nick = '${nick}' LIMIT 1`)
const getAll = () => db.any('SELECT * from Nicknames')
const deleteTag = (nick) => db.none(`DELETE from Nicknames WHERE nick = '${nick}'`)

const setChannel = channel => db.none(`INSERT INTO Channel VALUES (${channel}, 1) ON CONFLICT DO UPDATE`);
const getChannel = () => db.one('SELECT channel from Channel where id = 1');

module.exports = {
  add: addTag,
  get: getTag,
  all: getAll,
  remove: deleteTag,
  getChannel: getChannel,
  setChannel: setChannel
}