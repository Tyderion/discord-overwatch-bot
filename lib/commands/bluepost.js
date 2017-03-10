var Clapp = require('../modules/clapp-discord');
var tags = require('../test');
let cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const URL = require('url');

/**
 * @param  {string} url
 * @returns {Promise<string>}
 */
function get(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve(body);
        });
    })
}
// Test: |tydow bluepost https://us.battle.net/forums/en/overwatch/topic/20753436342

module.exports = new Clapp.Command({
    name: "bluepost",
    desc: "Parses the linked blue battle.net forum post and transcribes the content to the channel",
    fn: (argv, context) => {
        return new Promise((resolve, reject) => {
            get(argv.args.url).then(body => {
                const posturl = URL.parse(argv.args.url);
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
                let date = moment(posttime, 'MM/DD/YYYY hh:mm a').format('MMMM DD YYYY');
                resolve(`**${title}**\n**${author}** on *${date}*:\n${text}`);
            });

        });
    },
    args: [
        {
            name: 'url',
            desc: 'The url of the blue post',
            type: 'string',
            required: true
        }
    ],
    flags: [
    ]
});
