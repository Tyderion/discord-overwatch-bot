"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
var index_1 = require("../index");
var COMMAND_NAME = 'rmtag';
var logger = index_1.getCommandLogger(COMMAND_NAME);
exports.default = new index_js_1.Command({
    name: COMMAND_NAME,
    desc: 'Removes a nickname',
    fn: function (argv, context) {
        helper_1.responseToSameChannel(context);
        var nickname = argv.args.nickname;
        logger.info("Removing nickname " + nickname);
        return storage_1.deleteTag(nickname).then(function () {
            logger.info("Successfully removed nickname " + nickname + ".");
            return "Successfully removed " + nickname + " from stored nicknames";
        }).catch(function (err) { return logger.error(err); });
    },
    args: [
        {
            name: 'nickname',
            desc: 'The nickname for the user',
            type: 'string',
            required: true
        }
    ],
    flags: []
});
//# sourceMappingURL=deleteTag.js.map