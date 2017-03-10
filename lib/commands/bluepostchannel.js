var Clapp = require('../modules/clapp-discord');
var tags = require('../test');

module.exports = new Clapp.Command({
  name: "bluepostchannel",
  desc: "Adds a Tag to a nickname so info can easily be retrieved",
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      tags.setChannel(context.msg.channel.id);
      resolve(`bluepost channel has been set to ${context.msg.channel.name}`);
    });
  },
  args: [
  ],
  flags: [
  ]
});


