
const get = require('./request').get;

const getJson = url => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return get(url).then(data => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
    return JSON.parse(data);
  });
}

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
const sanitizeNames = name => name.replace('Lúcio', 'Lucio').replace('Torbjörn', 'Torbjoern').replace('Soldier: 76', 'Soldier76');

/**
 * @param  {string} tag
 * @param  {string} region
 */
function getCompHeroDetails(tag, region, heroes) {
  const fixedNames = sanitizeNames(heroes);
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/hero/${fixedNames}/`;
  return getJson(url);
}

module.exports = {
  getCompInfoProfile: getCompInfoProfile,
  getCompInfoAll: getCompInfoAll,
  getPlayedCompHeroes: getPlayedCompHeroes,
  getCompHeroDetails: getCompHeroDetails
}
