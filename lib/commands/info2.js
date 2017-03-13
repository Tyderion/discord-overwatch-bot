var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');
var ow = require('../owapi');
const Discord = require('discord.js');

const sanitizeNameForMessage = name => name.replace('L&#xFA;cio', 'Lúcio').replace('Torbj&#xF6;rn', 'Torbjörn').replace('Torbjoern', 'Torbjörn').replace('Lucio', 'Lúcio').replace('Soldier76', 'Soldier: 76');
const orZero = p => p ? p : 0;

module.exports = new Clapp.Command({
  name: "info2",
  desc: "Get Overwatch Info for a registered nickname (NOT WORKING)",
  fn: (argv, context) => {
    context.responseConfig.channel = context.msg.channel.id;
    const nickname = argv.args.nickname;
    const region = 'eu';
    return storage.get(nickname).then(tag => tag.battletag)
      .then(battletag => {
        return Promise.all([
          battletag,
          ow.getCompInfoProfile(battletag, region),
          ow.getCompInfoAll(battletag, region),
          ow.getPlayedCompHeroes(battletag, region)
        ]);
      }).then(([battletag, info, allHeroes, playedHeroes]) => {
        const top5 = playedHeroes.filter(hero => hero.playtime !== '--').slice(0, 5);
        const embed = new Discord.RichEmbed({
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
        embed.addField('Medals', `${allHeroes.Medals} (${allHeroes['Medals-Gold']}/${allHeroes['Medals-Silver']}/${allHeroes['Medals-Bronze']})`, true);
        embed.addField('Cards', allHeroes.Cards, true);
        return Promise.all([
          embed,
          ow.getCompHeroDetails(battletag, region, top5.map(h => sanitizeNameForMessage(h.name)).join(','))
        ]);
      }).then(([embed, heroDetails]) => {
        Object.keys(heroDetails).forEach(name => {
          const hero = heroDetails[name];
          const time = hero.TimePlayed ? hero.TimePlayed : '0minutes';
          let str = `${time.replace(/([0-9]+)([a-zA-Z]+)/, '$1 $2')}: ${hero.WinPercentage} wins`
          embed.addField(sanitizeNameForMessage(name), str);
        });
        context.responseConfig.embed = embed;
        context.responseConfig.useEmbed = true;
        return '';
      });
  },
  args: [
    {
      name: 'nickname',
      desc: 'The nickname for the user',
      type: 'string',
      required: true
    }
  ],
  flags: [
  ]
});
