"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("./request");
var getJson = function (url) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return request_1.get(url).then(function (data) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
        return JSON.parse(data);
    });
};
/**
 * @param  {string} tag
 * @param  {string} region
 */
function getCompInfoProfile(tag, region) {
    var url = "https://api.lootbox.eu/pc/" + region + "/" + tag.replace('#', '-') + "/profile";
    return getJson(url).then(function (r) { return r.data; });
}
exports.getCompInfoProfile = getCompInfoProfile;
/**
 * @param  {string} tag
 * @param  {string} region
 */
function getCompInfoAll(tag, region) {
    var url = "https://api.lootbox.eu/pc/" + region + "/" + tag.replace('#', '-') + "/competitive/allHeroes/";
    return getJson(url);
}
exports.getCompInfoAll = getCompInfoAll;
/**
 * @param  {string} tag
 * @param  {string} region
 */
function getPlayedCompHeroes(tag, region) {
    var url = "https://api.lootbox.eu/pc/" + region + "/" + tag.replace('#', '-') + "/competitive/heroes";
    return getJson(url);
}
exports.getPlayedCompHeroes = getPlayedCompHeroes;
var sanitizeNames = function (name) { return name.replace('Lúcio', 'Lucio').replace('Torbjörn', 'Torbjoern').replace('Soldier: 76', 'Soldier76'); };
/**
 * @param  {string} tag
 * @param  {string} region
 */
function getCompHeroDetails(tag, region, heroes) {
    var fixedNames = sanitizeNames(heroes);
    var url = "https://api.lootbox.eu/pc/" + region + "/" + tag.replace('#', '-') + "/competitive/hero/" + fixedNames + "/";
    return getJson(url);
}
exports.getCompHeroDetails = getCompHeroDetails;
//# sourceMappingURL=owapi.js.map