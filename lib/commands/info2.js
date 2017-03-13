var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');
var ow = require('../owapi');
const Discord = require('discord.js');

const sanitizeNameForMessage = name => name.replace('L&#xFA;cio', 'Lúcio').replace('Torbj&#xF6;rn', 'Torbjörn').replace('Torbjoern', 'Torbjörn').replace('Lucio', 'Lúcio').replace('Soldier76', 'Soldier: 76');

module.exports = new Clapp.Command({
  name: "info2",
  desc: "Get Overwatch Info for a registered nickname (NOT WORKING)",
  fn: (argv, context) => {
    const nickname = argv.args.nickname;
    context.responseConfig.channel = context.msg.channel.id;
    return new Promise((resolve, reject) => {
      return storage.get(nickname).then(result => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const region = 'eu';
        // const embed = new Discord.RichEmbed({
        //       title: `Competitive stats for ${result.battletag}`,
        //       description: '',
        //       timestamp: new Date()
        //     });
        //     embed.addField('Field', 6.0);
            
        //     context.responseConfig.embed = embed;
        //     context.responseConfig.useEmbed = true;
        //     resolve('blub');
            
        return Promise.all([
          ow.getCompInfoProfile(result.battletag, region),
          ow.getCompInfoAll(result.battletag, region),
          ow.getPlayedCompHeroes(result.battletag, region)
        ]).then(([info, allHeroes, playedHeroes]) => {
          console.log('got info');
          let message = `${result.battletag} (Level ${info.level}): ${info.competitive.rank} SR after ${info.playtime.competitive} of competitive.`;
          const orZero = p => p ? p : 0;
          // let draws = data.games.competitive.played - data.games.competitive.wins - data.games.competitive.lost;
          message += `\nGames: ${orZero(allHeroes.GamesWon)}:${orZero(allHeroes.GamesTied)}:${orZero(allHeroes.GamesLost)}`;
          message += `\nKills: ${allHeroes.FinalBlows}`;
          message += `\nElims: ${allHeroes.Eliminations}`;
          message += `\nDeaths: ${allHeroes.Deaths}`;
          message += `\nElims/Deaths: ${Number(parseInt(allHeroes.Eliminations.replace(/,/g, '')) / parseInt(allHeroes.Deaths.replace(/,/g, ''))).toFixed(2)}`;
          message += `\nMedals: ${allHeroes.Medals} (Gold: ${allHeroes['Medals-Gold']} / Silver: ${allHeroes['Medals-Silver']} / Bronze: ${allHeroes['Medals-Bronze']})`;
          const top5 = playedHeroes.filter(hero => hero.playtime !== '--').slice(0, 5);
          console.log(top5);
          return ow.getCompHeroDetails(result.battletag, region, top5.map(h => sanitizeNameForMessage(h.name)).join(',')).then(heroDetails => {
            console.log('got winrates');

            const embed = new Discord.RichEmbed({
              title: `Competitive stats for ${result.battletag} (Level ${info.level})`,
              description: '',
              timestamp: new Date()
            });
            const kd = Number(parseInt(allHeroes.Eliminations.replace(/,/g, '')) / parseInt(allHeroes.Deaths.replace(/,/g, ''))).toFixed(2);
            embed.addField('Skill Rating', `**${info.competitive.rank}**`, true);
            embed.addField('Playtime', info.playtime.competitive, true);
            embed.addField('Games', `${orZero(allHeroes.GamesWon)}:${orZero(allHeroes.GamesTied)}:${orZero(allHeroes.GamesLost)}`, true);
            embed.addField('Kills', allHeroes.FinalBlows, true);
            embed.addField('Eliminations', allHeroes.Eliminations, true);
            embed.addField('Deaths', allHeroes.Deaths, true);
            embed.addField('Elims/Deaths', kd, true);
            embed.addField('Medals', `${allHeroes.Medals} (${allHeroes['Medals-Gold']}/${allHeroes['Medals-Silver']}/${allHeroes['Medals-Bronze']})`, true);
            embed.addField('Cards', allHeroes.Cards, true);
            embed.addField(`Top ${top5.length} Heroes`, '--------------', false);
            Object.keys(heroDetails).forEach(key => {
              const hero = heroDetails[key];
              const time = hero.TimePlayed ? hero.TimePlayed : '0minutes';
               let str = `${time.replace(/([0-9]+)([a-zA-Z]+)/, '$1 $2')}: ${hero.WinPercentage} wins`
              embed.addField(sanitizeNameForMessage(key), str);
            });
            // embed.addField('Gold', allHeroes['Medals-Gold'], true);
            // embed.addField('Silver', allHeroes['Medals-Silver'], true);
            // embed.addField('Bronze', allHeroes['Medals-Bronze'], true);

            context.responseConfig.embed = embed;
            context.responseConfig.useEmbed = true;

            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
            message += `\nMost Played Heroes (${top5.length})`
            const top5String = Object.keys(heroDetails).map(key => {
              const time = heroDetails[key].TimePlayed ? heroDetails[key].TimePlayed : '0minutes';
              let str = `\n${sanitizeNameForMessage(key)} (${time.replace(/([0-9]+)([a-zA-Z]+)/, '$1 $2')})`
              if (heroDetails[key].WinPercentage) {
                str += ` with ${heroDetails[key].WinPercentage} wins`
              }
              return str;
            });
            message += top5String.join('');
            resolve('```' + message + '```');
          })
        }).catch(err => resolve(err.message));
        
      }).catch(err => {
        resolve(`Nick ${nickname} is not in database`)
      });
    })
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
