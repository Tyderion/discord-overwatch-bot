"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("./request");
var index_1 = require("./index");
var logger = index_1.getLogger('owapi');
var urlLogger = logger.subLogger('urls');
var getJson = function (url) {
    logger.info("Loading OWAPI Data: " + url);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return request_1.get(url).then(function (data) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
        var parsed = JSON.parse(data);
        Object.keys(parsed).forEach(function (key) {
            parsed[key.replace('-', '_')] = parsed[key];
        });
        return parsed;
    });
};
var BASE_URL = 'https://api.lootbox.eu';
var tagToUrl = function (tag) { return tag.replace('#', '-'); };
var createUrl = function (tag, region, platform) {
    var url = BASE_URL + "/" + platform + "/" + region + "/" + tagToUrl(tag);
    urlLogger.info('creating url for: ', platform, ' - ', region, ': ', url);
    return url;
};
exports.convertNames = (function () {
    var lucio = {
        regex: /L&#xFA;cio|Lucio|Lúcio/g,
        display: 'Lúcio',
        url: 'Lucio'
    };
    var torb = {
        regex: /Torbj&#xF6;rn|Torbjoern|Torbjörn/g,
        display: 'Torbjörn',
        url: 'Torbjoern'
    };
    var soldier = {
        regex: /Soldier: 76|Soldier76/g,
        display: 'Soldier: 76',
        url: 'Soldier76'
    };
    return {
        toDisplay: function (name) { return name.replace(lucio.regex, lucio.display).replace(torb.regex, torb.display).replace(soldier.regex, soldier.display); },
        toUrl: function (names) { return names.replace(lucio.regex, lucio.url).replace(torb.regex, torb.url).replace(soldier.regex, soldier.url); }
    };
})();
exports.getCompInfoProfile = function (tag, region, platform) { return getJson(createUrl(tag, region, platform) + "/profile").then(function (r) { return r.data; }); };
exports.getCompInfoAll = function (tag, region, platform) { return getJson(createUrl(tag, region, platform) + "/competitive/allHeroes/"); };
exports.getCompHeroes = function (tag, region, platform) { return getJson(createUrl(tag, region, platform) + "/competitive/heroes"); };
exports.getCompHeroDetails = function (tag, region, platform, heroes) {
    var names = exports.convertNames.toUrl(heroes.map(function (hero) { return hero.name; }).join());
    return getJson(createUrl(tag, region, platform) + "/competitive/hero/" + names + "/");
};
//# sourceMappingURL=owapi.js.map