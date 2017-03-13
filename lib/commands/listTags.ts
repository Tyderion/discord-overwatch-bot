import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { getAll } from '../storage';

export default new Command({
  name: "tags",
  desc: "List all registered nicknames",
  fn: (argv, context: Context) => {
    responseToSameChannel(context);
    return getAll().then(tags => tags.map(obj => `${obj.nick}: ${obj.battletag}`).join('\n'))
  },
  args: [
  ],
  flags: [
  ]
});
