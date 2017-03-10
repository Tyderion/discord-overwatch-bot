var Clapp = require('../modules/clapp-discord');
var tags = require('../storage');

module.exports = new Clapp.Command({
  name: "setbpc",
  desc: "Sets the channel from which this command is sent as the defualt channel for transcribing blueposts",
  fn: (argv, context) => {
    return new Promise((resolve, reject) => {
      tags.setChannel(context.msg.channel.id);
      context.responseConfig.channel = context.msg.channel.id;
      resolve(`Bluepost channel has been set to ${context.msg.channel.name}`);
    });
  },
  args: [
  ],
  flags: [
  ]
});


