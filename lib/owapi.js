
const get = require('./request').get;

const getJson = url => get(url).then(JSON.parse);

/**
 * @param  {string} tag
 * @param  {string} region
 */
function getCompInfoProfile(tag, region) {
    const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/profile`;
    return getJson(url).then(r => r.data);
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
function getCompInfoAll(tag, region) {
    const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/allHeroes/`;
    console.log(url);
    return getJson(url);
}

module.exports = {
    getCompInfoProfile: getCompInfoProfile,
    getCompInfoAll: getCompInfoAll
}