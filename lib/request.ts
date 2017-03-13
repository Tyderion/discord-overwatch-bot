const request = require('request');

export function get(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
}
