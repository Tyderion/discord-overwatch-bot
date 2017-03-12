var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');

module.exports = new Clapp.Command({
  name: "rmtag",
  desc: "Removes a nickname",
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      return storage.remove(argv.args.nickname).then(() => `Successfully removed ${argv.args.nickname} from stored nicknames`).catch(err => console.log(err));
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
