var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('overwatchbot.sqlite');


db.on('trace', query => {
  console.log('executing: ', query);
});

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS Nicknames (nick varchar(20), battletag varchar(50))", result => {
    console.log('crewated table: ', result);
  });

  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();

  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //     console.log(row.id + ": " + row.info);
  // });
});



const addTag = (nick, tag, cb) => {
  const stmt = `INSERT INTO Nicknames VALUES ('${nick}', '${tag}')`;
  console.log('trying to add tag: ', nick, tag, stmt);
  db.serialize(() => {
    db.run(stmt, err => {
      cb();
    });
  });
};

const getTag = (nick, cb) => {
  db.serialize(() => {
    console.log('getting tag for nickname: ', `SELECT * from Nicknames where nick = '${nick}'`);
    db.get(`SELECT * from Nicknames where nick = '${nick}'`, (error, result) => {
      cb(result);
    });
  });
}

const getAll = (cb) => {
  db.serialize(() => {
    db.all(`SELECT * from Nicknames`, (error, result) => {
      cb(result);
    });
  });
}

const tags = {
  'tyd': 'tyd#123'
};

module.exports = {
  add: (nick, tag, cb) => addTag(nick, tag, cb),
  get: (nick, cb) => getTag(nick, cb),
  all: (cb) => getAll(cb),
  remove: (nick) => tags[nick] = undefined
}
