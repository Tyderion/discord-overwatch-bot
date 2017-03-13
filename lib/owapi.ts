import { get } from './request';

const getJson = (url: string): Promise<{ data: any }> => {
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
export function getCompInfoProfile(tag, region) {
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/profile`;
  return getJson(url).then(r => r.data);
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
export function getCompInfoAll(tag, region) {
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/allHeroes/`;
  return getJson(url);
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
export function getPlayedCompHeroes(tag, region) {
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/heroes`;
  return getJson(url);
}
const sanitizeNames = name => name.replace('Lúcio', 'Lucio').replace('Torbjörn', 'Torbjoern').replace('Soldier: 76', 'Soldier76');

/**
 * @param  {string} tag
 * @param  {string} region
 */
export function getCompHeroDetails(tag, region, heroes) {
  const fixedNames = sanitizeNames(heroes);
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/hero/${fixedNames}/`;
  return getJson(url);
}
