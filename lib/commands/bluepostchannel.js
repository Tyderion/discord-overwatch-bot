"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
var index_1 = require("../index");
var COMMAND_NAME = 'setbpc';
var logger = index_1.getCommandLogger(COMMAND_NAME);
exports.default = new index_js_1.Command({
    name: COMMAND_NAME,
    desc: 'Sets the channel from which this command is sent as the default channel for transcribing blueposts',
    fn: function (argv, context) {
        if (context.msg.channel.type !== 'text') {
            return 'Please use this command in a text channel';
        }
        return storage_1.setChannel(context.msg.channel.id).then(function () {
            helper_1.responseToSameChannel(context);
            var channelName = context.msg.channel.name;
            logger.info("Bluepost channel successfully set to: " + channelName);
            return "bluepost channel has been set to " + channelName;
        }).catch(function (err) {
            logger.error(err);
        });
    },
    args: [],
    flags: []
});
//# sourceMappingURL=bluepostchannel.js.map