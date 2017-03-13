"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
exports.default = new index_js_1.Command({
    name: "setbpc",
    desc: "Sets the channel from which this command is sent as the default channel for transcribing blueposts",
    fn: function (argv, context) {
        return storage_1.setChannel(context.msg.channel.id).then(function () {
            helper_1.responseToSameChannel(context);
            return "bluepost channel has been set to " + context.msg.channel.name;
        }).catch(function (err) {
            console.log(err);
        });
    },
    args: [],
    flags: []
});
//# sourceMappingURL=bluepostchannel.js.map