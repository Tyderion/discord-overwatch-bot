import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { setChannel } from '../storage';
import { TextChannel } from 'discord.js';
import { getCommandLogger } from '../index';

const COMMAND_NAME = 'setbpc';
const logger = getCommandLogger(COMMAND_NAME);

export default new Command({
  name: COMMAND_NAME,
  desc: 'Sets the channel from which this command is sent as the default channel for transcribing blueposts',
  fn: (argv, context: Context) => {
    if (context.msg.channel.type !== 'text') {
      return 'Please use this command in a text channel';
    }
    return setChannel(context.msg.channel.id).then(() => {
      responseToSameChannel(context);
      const channelName = (context.msg.channel as TextChannel).name;
      logger.info(`Bluepost channel successfully set to: ${channelName}`)
      return `bluepost channel has been set to ${channelName}`;
    }).catch(err => {
      logger.error(err);
    });
  },
  args: [
  ],
  flags: [
  ]
});


