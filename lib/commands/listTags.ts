import { responseToSameChannel } from './../helper';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { all } from '../storage.js';

export default new Command({
  name: "tags",
  desc: "List all registered nicknames",
  fn: (argv, context: Context) => {
    responseToSameChannel(context);
    return all().then(tags => tags.map(obj => `${obj.nick}: ${obj.battletag}`).join('\n'))
  },
  args: [
  ],
  flags: [
  ]
});
