const request = require('request');

module.exports = {
    /**
 * @param  {string} url
 * @returns {Promise<string>}
 */
    get: function get(url) {
        return new Promise((resolve, reject) => {
            request(url, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                resolve(body);
            });
        })
    }
}