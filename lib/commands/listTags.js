var Clapp = require('../modules/clapp-discord');
var tags = require('../test');


module.exports = new Clapp.Command({
  name: "tags",
  desc: "does foo things",
  fn: (argv, context) => {
    return Object.keys(tags.all()).map(nick => `'${nick}': ${tags.get(nick)}`).join('\n');
    // // This output will be redirected to your app's onReply function
    // return 'Foo was executed!' + ' The value of testarg is: ' + JSON.stringify(argv.args);
  },
  args: [
  ],
  flags: [
  ]
});
