import { CompAllHeroes, HeroUsage, Profile, HeroDetailsCommon } from './types';
import { get } from './request';


const getJson = <T>(url: string): Promise<T> => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return get(url).then(data => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
    const parsed = JSON.parse(data);
    Object.keys(parsed).forEach(key => {
      parsed[key.replace('-', '_')] = parsed[key];
    });
    return parsed;
  });
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
export function getCompInfoProfile(tag, region): Promise<Profile> {
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/profile`;
  return getJson<{ data: Profile }>(url).then(r => r.data);
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
export function getCompInfoAll(tag, region): Promise<CompAllHeroes> {
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/allHeroes/`;
  return getJson<CompAllHeroes>(url).then(result => {
    console.log('info all', result);
    return result;
  });
}

/**
 * @param  {string} tag
 * @param  {string} region
 */
export function getPlayedCompHeroes(tag, region): Promise<HeroUsage[]> {
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/heroes`;
  return getJson<HeroUsage[]>(url);
}
const sanitizeNames = name => name.replace('Lúcio', 'Lucio').replace('Torbjörn', 'Torbjoern').replace('Soldier: 76', 'Soldier76');

/**
 * @param  {string} tag
 * @param  {string} region
 */
export function getCompHeroDetails(tag, region, heroes): Promise<{ [name: string]: HeroDetailsCommon }> {
  const fixedNames = sanitizeNames(heroes);
  const url = `https://api.lootbox.eu/pc/${region}/${tag.replace('#', '-')}/competitive/hero/${fixedNames}/`;
  return getJson<{ [name: string]: HeroDetailsCommon }>(url);
}
