"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var storage_1 = require("../storage");
exports.default = new index_js_1.Command({
    name: "tags",
    desc: "List all registered nicknames",
    fn: function (argv, context) {
        helper_1.responseToSameChannel(context);
        return storage_1.getAll().then(function (tags) { return tags.map(function (obj) { return obj.nick + ": " + obj.battletag; }).join('\n'); });
    },
    args: [],
    flags: []
});
//# sourceMappingURL=listTags.js.map