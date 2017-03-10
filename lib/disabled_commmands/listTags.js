var Clapp = require('../modules/clapp-discord');
var tags = require('../storage');


module.exports = new Clapp.Command({
  name: "tags",
  desc: "List all registered nicknames",
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      tags.all((result) => {
        resolve(result.map(obj => `${obj.nick}: ${obj.battletag}`).join('\n'));
      });
    });
  },
  args: [
  ],
  flags: [
  ]
});
