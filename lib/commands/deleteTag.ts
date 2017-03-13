import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { deleteTag } from '../storage';

export default new Command({
  name: "rmtag",
  desc: "Removes a nickname",
  fn: (argv, context: Context) => {
    responseToSameChannel(context);
    return deleteTag(argv.args.nickname).then(() => `Successfully removed ${argv.args.nickname} from stored nicknames`).catch(err => console.log(err));
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
