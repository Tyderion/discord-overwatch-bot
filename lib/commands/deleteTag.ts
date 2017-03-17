import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { deleteTag } from '../storage';
import { getCommandLogger } from '../index';

const COMMAND_NAME = 'rmtag';
const logger = getCommandLogger(COMMAND_NAME);

export default new Command({
  name: COMMAND_NAME,
  desc: 'Removes a nickname',
  fn: (argv: { args: { nickname: string } }, context: Context) => {
    responseToSameChannel(context);
    const nickname = argv.args.nickname;
    logger.info(`Removing nickname ${nickname}`)
    return deleteTag(nickname).then(() => {
      logger.info(`Successfully removed nickname ${nickname}.`)
      return `Successfully removed ${nickname} from stored nicknames`;
    }).catch(err => logger.error(err));
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
