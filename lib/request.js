"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
function get(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve(body);
        });
    });
}
exports.get = get;
//# sourceMappingURL=request.js.map