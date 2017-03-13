var Clapp = require('../modules/clapp-discord');
var storage = require('../storage');
var ow = require('../owapi');

const sanitizeNameForMessage = name => name.replace('L&#xFA;cio', 'Lúcio').replace('Torbj&#xF6;rn', 'Torbjörn').replace('Torbjoern', 'Torbjörn').replace('Lucio', 'Lúcio').replace('Soldier76', 'Soldier: 76');

module.exports = new Clapp.Command({
  name: "info",
  desc: "Get Overwatch Info for a registered nickname (NOT WORKING)",
  fn: (argv, context) => {
    const nickname = argv.args.nickname;
    context.responseConfig.channel = context.msg.channel.id;
    return new Promise((resolve, reject) => {
      return storage.get(nickname).then(result => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const region = 'eu';
        return Promise.all([
          ow.getCompInfoProfile(result.battletag, region),
          ow.getCompInfoAll(result.battletag, region),
          ow.getPlayedCompHeroes(result.battletag, region)
        ]).then(([info, allHeroes, playedHeroes]) => {
          let message = `${result.battletag} (Level ${info.level}): ${info.competitive.rank} SR after ${info.playtime.competitive} of competitive.`;
          const orZero = p => p ? p : 0;
          // let draws = data.games.competitive.played - data.games.competitive.wins - data.games.competitive.lost;
          message += `\nGames: ${orZero(allHeroes.GamesWon)}:${orZero(allHeroes.GamesTied)}:${orZero(allHeroes.GamesLost)}`;
          message += `\nKills: ${allHeroes.FinalBlows}`;
          message += `\nElims: ${allHeroes.Eliminations}`;
          message += `\nDeaths: ${allHeroes.Deaths}`;
          message += `\nElims/Deaths: ${Number(parseInt(allHeroes.Eliminations.replace(/,/g, '')) / parseInt(allHeroes.Deaths.replace(/,/g, ''))).toFixed(2)}`;
          message += `\nMedals: ${allHeroes.Medals} (Gold: ${allHeroes['Medals-Gold']} / Silver: ${allHeroes['Medals-Bronze']} / Bronze: ${allHeroes['Medals-Silver']})`;
          const top5 = playedHeroes.slice(0, 5).filter(hero => hero.playtime !== '--');
          return ow.getCompHeroDetails(result.battletag, region, top5.map(h => sanitizeNameForMessage(h.name)).join(',')).then(result => {

            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
            message += `\nMost Played Heroes (${top5.length})`
            const top5String = Object.keys(result).map(key => {
              const time = result[key].TimePlayed ? result[key].TimePlayed : '0minutes';
              let str = `\n${sanitizeNameForMessage(key)} (${time.replace(/([0-9]+)([a-zA-Z]+)/, '$1 $2')})`
              if (result[key].WinPercentage) {
                str += ` with ${result[key].WinPercentage} wins`
              }
              return str;
            }).join('');
            message += top5String;
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