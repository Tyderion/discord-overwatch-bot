import { CompAllHeroes, HeroUsage, Profile, HeroDetailsCommon, Wrapper, HeroDetails } from './types';
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

const BASE_URL = 'https://api.lootbox.eu';
const tagToUrl = (tag: string): string => tag.replace('#', '-');
const createUrl = (tag: string, region: string, platform: string): string => {
  const url = `${BASE_URL}/${platform}/${region}/${tagToUrl(tag)}`;
  console.log('creating url: ', platform,' - ',  region, ': ', url);
  return `${BASE_URL}/${platform}/${region}/${tagToUrl(tag)}`
}

export interface NameConverter {
  toDisplay: (string) => string;
  toUrl: (string) => string;

}

export const convertNames: NameConverter = (() => {
  const lucio = {
    regex: /L&#xFA;cio|Lucio|Lúcio/g,
    display: 'Lúcio',
    url: 'Lucio'
  }
  const torb = {
    regex: /Torbj&#xF6;rn|Torbjoern|Torbjörn/g,
    display: 'Torbjörn',
    url: 'Torbjoern'
  }
  const soldier = {
    regex: /Soldier: 76|Soldier76/g,
    display: 'Soldier: 76',
    url: 'Soldier76'
  }
  return {
    toDisplay: name => name.replace(lucio.regex, lucio.display).replace(torb.regex, torb.display).replace(soldier.regex, soldier.display),
    toUrl: names => names.replace(lucio.regex, lucio.url).replace(torb.regex, torb.url).replace(soldier.regex, soldier.url)
  };
})()

export const getCompInfoProfile = (tag: string, region: string, platform: string): Promise<Profile> => getJson<Wrapper<Profile>>(`${createUrl(tag, region, platform)}/profile`).then(r => r.data);

export const getCompInfoAll = (tag: string, region: string, platform: string): Promise<CompAllHeroes> => getJson<CompAllHeroes>(`${createUrl(tag, region, platform)}/competitive/allHeroes/`);

export const getCompHeroes = (tag: string, region: string, platform: string): Promise<HeroUsage[]> => getJson<HeroUsage[]>(`${createUrl(tag, region, platform)}/competitive/heroes`);

export const getCompHeroDetails = (tag: string, region: string, platform: string, heroes: HeroUsage[]): Promise<HeroDetails> => {
  const names = convertNames.toUrl(heroes.map(hero => hero.name).join());
  return getJson<HeroDetails>(`${createUrl(tag, region, platform)}/competitive/hero/${names}/`);
}