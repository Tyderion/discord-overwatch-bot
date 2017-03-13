import * as cheerio from 'cheerio';
import * as request from 'request';
import * as moment from 'moment';
import * as URL from 'url';
import { Context } from './../types';
import { Command } from '../modules/clapp-discord/index.js';
import { getChannel } from '../storage';
import { RichEmbed } from 'discord.js';
import { get } from './../request';

// Test: !tow bp https://us.battle.net/forums/en/overwatch/topic/20753436342

export default new Command({
  name: "bp",
  desc: "Parses the linked blue battle.net forum post and transcribes the content to the channel",

  args: [
    {
      name: 'url',
      desc: 'The url of the blue post',
      type: 'string',
      required: true,
      validations: [{
        errorMessage: 'The link has to be to a topic on the blizzard overwatch forums.',
        validate: (val: string) => val.indexOf('battle.net/forums/en/overwatch/topic/') !== -1
      }]
    }
  ],
  flags: [
  ],
  fn: (argv: { args: { url: string } }, context: Context) => {
    return getChannel().then(channel => {
      context.responseConfig.channel = channel.channel;
      return new Promise((resolve, reject) => {
        if (context.msg.deletable) {
          context.msg.delete();
        }
        const url = argv.args.url.startsWith('http') ? argv.args.url : 'https://' + argv.args.url;
        get(url).then(body => {
          const posturl = URL.parse(url);
          const $ = cheerio.load(body);
          const id = posturl.hash ? posturl.hash : '#post-1';
          const post = $(id)
          const title = $('.Topic-title').text();
          const author = JSON.parse(post.attr('data-topic-post')).author.name;
          const posthtml = post.html();
          const posttime = cheerio.load(posthtml)('.TopicPost-details .TopicPost-timestamp').attr('data-tooltip-content');
          let postcontent = cheerio.load(posthtml)('.TopicPost-bodyContent').html();
          postcontent = postcontent.replace(/<br>/g, '\n')
            .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
            .replace(/<span class="underline">(.*?)<\/span>/g, '__$1__');
          let text = cheerio.load(postcontent).text();
          let embeds: RichEmbed[] = [];
          if (text.length > 2000) {
            const parts = text.replace(/\n\n/g, '\n').split('\n');
            const combined = parts.reduce((acc, part) => {
              const curr = acc[acc.length -1];
              if (curr.length + part.length < 2000) {
                acc[acc.length - 1] = curr +'\n\n'+ part;
              } else {
                acc[acc.length] = part;
              }
              return acc;
            }, ['']);
            combined.forEach((part, index) => {
              embeds.push(new RichEmbed({
                title: `${title} Part ${index+1}`,
                description: part,
                url: url,
                timestamp: moment(posttime, 'MM/DD/YYYY hh:mm a').toDate(),
                author: {
                  name: author
                }
              }));
            });
          } else {
            embeds.push(new RichEmbed({
              title: title,
              description: text.substring(0, 2050),
              url: url,
              timestamp: moment(posttime, 'MM/DD/YYYY hh:mm a').toDate(),
              author: {
                name: author
              }
            }));
          }

          context.responseConfig.embeds = embeds;
          context.responseConfig.useEmbed = true;

          let date = moment(posttime, 'MM/DD/YYYY hh:mm a').format('MMMM DD YYYY');
          resolve(`**${title}**\n${url}\n**${author}** on *${date}*:\n${text}`);
        });

      });
    })

  }
});
