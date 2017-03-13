"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
exports.default = new index_js_1.Command({
    name: "rmtag",
    desc: "Removes a nickname",
    fn: function (argv, context) {
        helper_1.responseToSameChannel(context);
        return storage_1.deleteTag(argv.args.nickname).then(function () { return "Successfully removed " + argv.args.nickname + " from stored nicknames"; }).catch(function (err) { return console.log(err); });
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