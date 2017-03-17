"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
var index_1 = require("../index");
var COMMAND_NAME = 'tag';
var logger = index_1.getCommandLogger(COMMAND_NAME);
exports.default = new index_js_1.Command({
    name: COMMAND_NAME,
    desc: 'Adds a Tag to a nickname so info can easily be retrieved',
    args: [
        {
            name: 'nickname',
            desc: 'The nickname for the user',
            type: 'string',
            required: true
        },
        {
            name: 'battletag',
            desc: 'The battletag for this nickname',
            type: 'string',
            required: true
        }
    ],
    flags: [],
    fn: function (argv, context) {
        helper_1.responseToSameChannel(context);
        logger.info("Adding Tag: '" + argv.args.nickname + "' = '" + argv.args.battletag + "'");
        return storage_1.addTag(argv.args.nickname, argv.args.battletag).then(function () { return "Successfully added battletag " + argv.args.battletag + " as " + argv.args.nickname; });
    }
});
//# sourceMappingURL=addTag.js.map