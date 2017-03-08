var Clapp = require('../modules/clapp-discord');
var tags = require('../test');

module.exports = new Clapp.Command({
  name: "info",
  desc: "does foo things",
  fn: (argv, context) => {
    const nickname = argv.args.nickname;
    return `Loading overwatch statistics for ${nickname} with tag ${tags.get(nickname)}`
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
