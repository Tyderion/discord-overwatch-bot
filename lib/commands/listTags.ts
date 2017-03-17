import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { getAll } from '../storage';
import { getCommandLogger } from '../index';

const COMMAND_NAME = 'tags';
const logger = getCommandLogger(COMMAND_NAME);
export default new Command({
  name: COMMAND_NAME,
  desc: 'List all registered nicknames',
  fn: (argv, context: Context) => {
    responseToSameChannel(context);
    logger.info('Loading all tags');
    return getAll().then(tags => {
      logger.info('Successfully loaded all tags.');
      return tags.map(obj => `${obj.nick}: ${obj.battletag}`).join('\n')
    });
  },
  args: [
  ],
  flags: [
  ]
});
