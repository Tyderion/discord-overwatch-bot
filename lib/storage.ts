var sqlite3 = require('sqlite3').verbose();
var pg = require('pg-promise')();

import { getLogger } from './index';

const logger = getLogger('storage');

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
  .then((results) => {
    logger.info('table created', results);
    // return db.any(`INSERT INTO Channel VALUES (1,'289018837100396545')`);
    //setChannel('289018837100396545')
  }).catch(err => {
    logger.error(err);
  });

export const addTag = (nick, tag) => {
  const stmt = `INSERT INTO Nicknames (nick, battletag) VALUES ('${nick}', '${tag}')`;
  logger.info(`adding tag: ${stmt}`);
  return db.none(stmt)
  .catch(err =>  {
    const update = `UPDATE Nicknames set battletag = '${tag}' WHERE nick = '${nick}'`;
    logger.info('tag already exists, updating: ', update);
    return db.none(update).catch(err => {
      logger.log('error updating', err);
    })
  });
};

export const getTag = (nick) => {
  const stmt = `SELECT * from Nicknames where nick = '${nick}' LIMIT 1`;
  logger.info('Getting Tag: ', stmt);
  db.one(stmt)
}
export const getAll = () => { 
  const stmt = 'SELECT * from Nicknames';
  logger.info(`Loading all nicknames: ${stmt}`)
  return db.any(stmt); 
}
export const deleteTag = (nick) => {
  const stmt = `DELETE from Nicknames WHERE nick = '${nick}'`; 
  logger.info(`Removing ${nick} from the database.: ${stmt}`)
  return db.none(stmt)
}

export const setChannel = channel => {
  const stmt = `UPDATE Channel set channel = '${channel}' where id = 1`;
  logger.info('Setting channel: ',stmt);
  return db.none(stmt);
}
export const getChannel = () => {
  const stmt = 'SELECT channel from Channel where id = 1';
  logger.info('Getting Channel: ', stmt);
  return db.one(stmt);
}
