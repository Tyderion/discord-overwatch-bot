var Clapp = require('../modules/clapp-discord');
var tags = require('../test');

module.exports = new Clapp.Command({
  name: "addTag",
  desc: "does foo things",
  fn: (argv, context) => {
    tags.add(argv.args.nickname, argv.args.battletag);
    // This output will be redirected to your app's onReply function
    return 'Foo was executed!' + ' The value of testarg is: ' + JSON.stringify(argv.args);
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
