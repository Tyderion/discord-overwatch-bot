"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var moment = require("moment");
var URL = require("url");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
var discord_js_1 = require("discord.js");
var request_1 = require("./../request");
// Test: !tow bp https://us.battle.net/forums/en/overwatch/topic/20753436342
exports.default = new index_js_1.Command({
    name: "bp",
    desc: "Parses the linked blue battle.net forum post and transcribes the content to the channel",
    args: [
        {
            name: 'url',
            desc: 'The url of the blue post',
            type: 'string',
            required: true
        }
    ],
    flags: [],
    fn: function (argv, context) {
        return storage_1.getChannel().then(function (channel) {
            context.responseConfig.channel = channel.channel;
            return new Promise(function (resolve, reject) {
                if (context.msg.deletable) {
                    context.msg.delete();
                }
                var url = argv.args.url;
                request_1.get(url).then(function (body) {
                    var posturl = URL.parse(url);
                    var $ = cheerio.load(body);
                    var id = posturl.hash ? posturl.hash : '#post-1';
                    var post = $(id);
                    var title = $('.Topic-title').text();
                    var author = JSON.parse(post.attr('data-topic-post')).author.name;
                    var posthtml = post.html();
                    var posttime = cheerio.load(posthtml)('.TopicPost-details .TopicPost-timestamp').attr('data-tooltip-content');
                    var postcontent = cheerio.load(posthtml)('.TopicPost-bodyContent').html();
                    postcontent = postcontent.replace(/<br>/g, '\n')
                        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
                        .replace(/<span class="underline">(.*?)<\/span>/g, '__$1__');
                    var text = cheerio.load(postcontent).text();
                    var embed = new discord_js_1.RichEmbed({
                        title: title,
                        description: text,
                        url: url,
                        timestamp: moment(posttime, 'MM/DD/YYYY hh:mm a').toDate(),
                        author: {
                            name: author
                        }
                    });
                    context.responseConfig.embed = embed;
                    context.responseConfig.useEmbed = true;
                    var date = moment(posttime, 'MM/DD/YYYY hh:mm a').format('MMMM DD YYYY');
                    resolve("**" + title + "**\n" + url + "\n**" + author + "** on *" + date + "*:\n" + text);
                });
            });
        });
    }
});
//# sourceMappingURL=bluepost.js.map