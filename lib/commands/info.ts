import { getTag } from './../storage';
import { responseToSameChannel } from './../helper';
import { Command } from '../modules/clapp-discord/index.js';
import { getCompHeroDetails, getCompInfoAll, getCompInfoProfile, getPlayedCompHeroes } from './../owapi';
import { RichEmbed } from 'discord.js';
import { Context, CompAllHeroes, HeroUsage, Profile } from './../types';

const sanitizeNameForMessage = name => name.replace('L&#xFA;cio', 'Lúcio').replace('Torbj&#xF6;rn', 'Torbjörn').replace('Torbjoern', 'Torbjörn').replace('Lucio', 'Lúcio').replace('Soldier76', 'Soldier: 76');
const orZero = p => p ? p : 0;

export default new Command({
  name: "info2",
  desc: "Get Overwatch Info for a registered nickname",
    args: [
    {
      name: 'nickname',
      desc: 'The nickname for the user',
      type: 'string',
      required: true
    }
  ],
  flags: [
  ],
  fn: async (argv: { args: { nickname: string }}, context: Context) => {
    responseToSameChannel(context);
    const nickname = argv.args.nickname;
    const region = 'eu';
    const battletag = (await getTag(nickname)).battletag;
    const [info, allHeroes, playedHeroes]= await Promise.all<Profile, CompAllHeroes, HeroUsage[]>([
      getCompInfoProfile(battletag, region),
      getCompInfoAll(battletag, region),
      getPlayedCompHeroes(battletag, region)
    ]);

    const top5 = playedHeroes.filter(hero => hero.playtime !== '--').slice(0, 5);
    const embed = new RichEmbed({
      title: `Competitive stats for ${battletag} (Level ${info.level})`,
      description: '',
      timestamp: new Date()
    });
    const kd = Number(parseInt(allHeroes.Eliminations.replace(/,/g, '')) / parseInt(allHeroes.Deaths.replace(/,/g, ''))).toFixed(2);
    embed.addField('Skill Rating', `**${info.competitive.rank}**`, true);
    embed.addField('Playtime', info.playtime.competitive, true);
    embed.addField('Games', `${allHeroes.GamesPlayed} (${orZero(allHeroes.GamesWon)}:${orZero(allHeroes.GamesTied)}:${orZero(allHeroes.GamesLost)})`, true);
    embed.addField('Kills', allHeroes.FinalBlows, true);
    embed.addField('Eliminations', allHeroes.Eliminations, true);
    embed.addField('Deaths', allHeroes.Deaths, true);
    embed.addField('Elims/Deaths', kd, true);
    embed.addField('Medals', `${allHeroes.Medals} (${allHeroes.Medals_Gold}/${allHeroes.Medals_Silver}/${allHeroes.Medals_Bronze})`, true);
    embed.addField('Cards', allHeroes.Cards, true);

    const heroDetails = await getCompHeroDetails(battletag, region, top5.map(h => sanitizeNameForMessage(h.name)).join(','));
    Object.keys(heroDetails).forEach(name => {
      const hero = heroDetails[name];
      const time = hero.TimePlayed ? hero.TimePlayed : '0minutes';
      let str = `${time.replace(/([0-9]+)([a-zA-Z]+)/, '$1 $2')}: ${hero.WinPercentage} wins`
      embed.addField(sanitizeNameForMessage(name), str);
    });
    context.responseConfig.embed = embed;
    context.responseConfig.useEmbed = true;
    return ' ';
  }
});
