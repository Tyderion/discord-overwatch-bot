

const tags = {
  'tyd': 'tyd#123'
};

module.exports = {
  add: (nick, tag) => tags[nick] = tag,
  get: (nick) => tags[nick],
  all: () => tags
}
