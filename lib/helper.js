"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseToSameChannel = function (context) {
    context.responseConfig.channel = context.msg.channel.id;
    return context;
};
//# sourceMappingURL=helper.js.map