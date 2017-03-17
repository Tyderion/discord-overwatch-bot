import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { setChannel } from '../storage';
import { TextChannel } from 'discord.js';
import { getCommandLogger } from '../index';
import { Logger } from '../logger';

const COMMAND_NAME = 'logscope';
const logger = getCommandLogger(COMMAND_NAME);

export default new Command({
  name: COMMAND_NAME,
  desc: 'Sets the scope of the logger (Useful for the owner of the bot)',
  fn: (argv: { args: { scope: string }}, context: Context) => {
   logger.info(`Setting log scope to: '${argv.args.scope}'`)
   Logger.LogScope = argv.args.scope;
  },
  args: [
    {
      name: 'scope',
      desc: 'The scope to log',
      type: 'string',
      default: ''
    }
  ],
  flags: [
  ]
});


