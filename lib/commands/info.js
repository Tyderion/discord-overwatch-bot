var Clapp = require('../modules/clapp-discord');
var tags = require('../test');

module.exports = new Clapp.Command({
  name: "info",
  desc: "does foo things",
  fn: (argv, context) => {
    const nickname =  argv.args.nickname;
    return new Promise((resolve, reject) => {
      tags.get(nickname, result => {
        console.log(result);
        if (result) {
          resolve(`Loading overwatch statistics for ${nickname} with tag ${result.battletag}`);
        } else {
          resolve(`Nick ${nickname} is not in database`);
        }
      });
    });
  },
  args: [
    {
      name: 'nickname',
      desc: 'The nickname for the user',
      type: 'string',
      required: true
    }
  ],
  flags: [
  ]
});
