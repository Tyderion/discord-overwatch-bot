var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');

module.exports = new Clapp.Command({
  name: "info",
  desc: "Get Overwatch Info for a registered nickname (NOT WORKING)",
  fn: (argv, context) => {
    const nickname = argv.args.nickname;
    return new Promise((resolve, reject) => {
      return storage.get(nickname).then(result => {
        resolve(`|owcomp ${result.battletag}`)
      }).catch(err => {
        resolve(`Nick ${nickname} is not in database`)
      });
    })
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
