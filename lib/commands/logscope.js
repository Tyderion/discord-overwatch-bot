"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../modules/clapp-discord/index.js");
var index_1 = require("../index");
var logger_1 = require("../logger");
var COMMAND_NAME = 'logscope';
var logger = index_1.getCommandLogger(COMMAND_NAME);
exports.default = new index_js_1.Command({
    name: COMMAND_NAME,
    desc: 'Sets the scope of the logger (Useful for the owner of the bot)',
    fn: function (argv, context) {
        logger.info("Setting log scope to: '" + argv.args.scope + "'");
        logger_1.Logger.LogScope = argv.args.scope;
    },
    args: [
        {
            name: 'scope',
            desc: 'The scope to log',
            type: 'string',
            default: ''
        }
    ],
    flags: []
});
//# sourceMappingURL=logscope.js.map