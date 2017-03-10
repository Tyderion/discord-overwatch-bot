var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');

module.exports = new Clapp.Command({
  name: "setbpc",
  desc: "Sets the channel from which this command is sent as the default channel for transcribing blueposts",
  fn: (argv, context) => {
    return storage.setChannel(context.msg.channel.id).then(result => {
      context.responseConfig.channel = context.msg.channel.id;
      return `bluepost channel has been set to ${context.msg.channel.name}`;
    }).catch(err => {
      console.log(err);
    });
  },
  args: [
  ],
  flags: [
  ]
});


