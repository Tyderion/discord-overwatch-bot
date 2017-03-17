"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
var index_1 = require("../index");
var COMMAND_NAME = 'tags';
var logger = index_1.getCommandLogger(COMMAND_NAME);
exports.default = new index_js_1.Command({
    name: COMMAND_NAME,
    desc: 'List all registered nicknames',
    fn: function (argv, context) {
        helper_1.responseToSameChannel(context);
        logger.info('Loading all tags');
        return storage_1.getAll().then(function (tags) {
            logger.info('Successfully loaded all tags.');
            return tags.map(function (obj) { return obj.nick + ": " + obj.battletag; }).join('\n');
        });
    },
    args: [],
    flags: []
});
//# sourceMappingURL=listTags.js.map