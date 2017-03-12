
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
    return getJson(url);
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
function getPlayedCompHeroes(tag, region) {
    const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/heroes`;
    return getJson(url); 
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
function getCompHeroDetails(tag, region, heroes) {
    const fixedNames = heroes.replace('Soldier: 76', 'Soldier76');
    const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/hero/${fixedNames}/`;
    return getJson(url); 
}

module.exports = {
    getCompInfoProfile: getCompInfoProfile,
    getCompInfoAll: getCompInfoAll,
    getPlayedCompHeroes: getPlayedCompHeroes,
    getCompHeroDetails: getCompHeroDetails
}