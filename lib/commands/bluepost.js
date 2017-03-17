"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var moment = require("moment");
var URL = require("url");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
var discord_js_1 = require("discord.js");
var request_1 = require("./../request");
var index_1 = require("../index");
var COMMAND_NAME = 'bp';
var logger = index_1.getCommandLogger(COMMAND_NAME);
// Test: !tow bp https://us.battle.net/forums/en/overwatch/topic/20753436342
exports.default = new index_js_1.Command({
    name: COMMAND_NAME,
    desc: 'Parses the linked blue battle.net forum post and transcribes the content to the channel',
    args: [
        {
            name: 'url',
            desc: 'The url of the blue post',
            type: 'string',
            required: true,
            validations: [{
                    errorMessage: 'The link has to be to a topic on the blizzard overwatch forums.',
                    validate: function (val) { return val.indexOf('battle.net/forums/en/overwatch/topic/') !== -1; }
                }]
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
                var url = argv.args.url.startsWith('http') ? argv.args.url : 'https://' + argv.args.url;
                logger.info('Getting Bluepost: ', url);
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
                    var embeds;
                    if (text.length > 2000) {
                        logger.info("Bluepost is toolong (" + text.length + "/2000), splitting into multiple embeds");
                        var parts = text.replace(/\n\n/g, '\n').split('\n');
                        var combined = parts.reduce(function (acc, part) {
                            var curr = acc[acc.length - 1];
                            if (curr.length + part.length < 2000) {
                                acc[acc.length - 1] = curr + '\n\n' + part;
                            }
                            else {
                                acc[acc.length] = part;
                            }
                            return acc;
                        }, ['']);
                        logger.info("Bluepost split into " + combined.length + " parts.");
                        embeds = combined.map(function (part, index) { return new discord_js_1.RichEmbed({
                            title: title + " Part " + (index + 1),
                            description: part,
                            url: url,
                            timestamp: moment(posttime, 'MM/DD/YYYY hh:mm a').toDate(),
                            author: {
                                name: author
                            }
                        }); });
                    }
                    else {
                        embeds = [
                            new discord_js_1.RichEmbed({
                                title: title,
                                description: text.substring(0, 2050),
                                url: url,
                                timestamp: moment(posttime, 'MM/DD/YYYY hh:mm a').toDate(),
                                author: {
                                    name: author
                                }
                            })
                        ];
                    }
                    context.responseConfig.embeds = embeds;
                    context.responseConfig.useEmbed = true;
                    var date = moment(posttime, 'MM/DD/YYYY hh:mm a').format('MMMM DD YYYY');
                    resolve("**" + title + "**\n" + url + "\n**" + author + "** on *" + date + "*:\n" + text);
                });
            });
        });
    }
});
//# sourceMappingURL=bluepost.js.map