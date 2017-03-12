var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');


module.exports = new Clapp.Command({
  name: "tags",
  desc: "List all registered nicknames",
  fn: (argv, context) => {
    return storage.all().then(tags => tags.map(obj => `${obj.nick}: ${obj.battletag}`).join('\n'))
  },
  args: [
  ],
  flags: [
  ]
});
