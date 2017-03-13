import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { addTag } from '../storage';

export default new Command({
  name: "tag",
  desc: "Adds a Tag to a nickname so info can easily be retrieved",
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
  ],
  fn: (argv, context: Context) => {
    responseToSameChannel(context);
    return addTag(argv.args.nickname, argv.args.battletag).then(() => `Successfully added battletag ${argv.args.battletag} as ${argv.args.nickname}`);
  }
});
