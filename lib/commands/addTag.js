var Clapp = require('../modules/clapp-discord');
var tags = require('../test');

module.exports = new Clapp.Command({
  name: "addTag",
  desc: "does foo things",
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      tags.add(argv.args.nickname, argv.args.battletag, () => {
        resolve(`Successfully added battletag ${argv.args.battletag} as ${argv.args.nickname}`);
      });
    });
  },
  args: [
    {
      name: 'nickname',
      desc: 'The nickname for the user',
      type: 'string',
      required: true
    },
    {
      name: 'battletag',
      desc: 'The battletag for this nickname',
      type: 'string',
      required: true
    }
  ],
  flags: [
  ]
});
