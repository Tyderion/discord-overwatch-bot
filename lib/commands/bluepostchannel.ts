import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { setChannel } from '../storage.js';
import { TextChannel } from 'discord.js';

export default new Command({
  name: "setbpc",
  desc: "Sets the channel from which this command is sent as the default channel for transcribing blueposts",
  fn: (argv, context: Context) => {
    return setChannel(context.msg.channel.id).then(() => {
      responseToSameChannel(context);
      return `bluepost channel has been set to ${(context.msg.channel as TextChannel).name}`;
    }).catch(err => {
      console.log(err);
    });
  },
  args: [
  ],
  flags: [
  ]
});


