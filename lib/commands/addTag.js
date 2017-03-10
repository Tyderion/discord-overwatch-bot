var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');

module.exports = new Clapp.Command({
  name: "addTag",
  desc: "Adds a Tag to a nickname so info can easily be retrieved",
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      return storage.add(argv.args.nickname, argv.args.battletag).then(() => `Successfully added battletag ${argv.args.battletag} as ${argv.args.nickname}`);
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
