"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = require("./../storage");
var helper_1 = require("./../helper");
var index_js_1 = require("../modules/clapp-discord/index.js");
var owapi_1 = require("./../owapi");
var discord_js_1 = require("discord.js");
var orZero = function (p) { return p ? p : 0; };
exports.default = new index_js_1.Command({
    name: "info",
    desc: "Get Overwatch Info for a registered nickname",
    args: [
        {
            name: 'nickname',
            desc: 'The nickname for the user',
            type: 'string',
            required: true
        },
        {
            name: 'region',
            desc: 'The region the user plays in, one of "eu", "us", "kr", "cn" or "global"',
            type: 'string',
            required: false,
            default: 'eu',
            validations: [{
                    errorMessage: 'Must be one of "eu", "us", "kr", "cn" or "global"',
                    validate: function (val) { return ['eu', 'us', 'kr', 'cn', 'global'].indexOf(val) !== -1; }
                }]
        }, {
            name: 'platform',
            desc: 'The platform the user plays on, one of "pc", "xbl" or "psn"',
            type: 'string',
            required: false,
            default: 'pc',
            validations: [{
                    errorMessage: 'Must be one of "pc", "xbl" or "psn"',
                    validate: function (val) { return ['pc', 'xbl', 'psn'].indexOf(val) !== -1; }
                }]
        }
    ],
    flags: [],
    fn: function (argv, context) { return __awaiter(_this, void 0, void 0, function () {
        var nickname, region, platform, battletag, _a, info, allHeroes, playedHeroes, top5, embed, kd, heroDetails;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    helper_1.responseToSameChannel(context);
                    nickname = argv.args.nickname;
                    region = argv.args.region;
                    platform = argv.args.platform;
                    return [4 /*yield*/, storage_1.getTag(nickname)];
                case 1:
                    battletag = (_b.sent()).battletag;
                    return [4 /*yield*/, Promise.all([
                            owapi_1.getCompInfoProfile(battletag, region, platform),
                            owapi_1.getCompInfoAll(battletag, region, platform),
                            owapi_1.getCompHeroes(battletag, region, platform)
                        ])];
                case 2:
                    _a = _b.sent(), info = _a[0], allHeroes = _a[1], playedHeroes = _a[2];
                    top5 = playedHeroes.filter(function (hero) { return hero.playtime !== '--'; }).slice(0, 5);
                    embed = new discord_js_1.RichEmbed({
                        title: "Competitive stats for " + battletag + " (Level " + info.level + ")",
                        description: '',
                        timestamp: new Date()
                    });
                    kd = Number(parseInt(allHeroes.Eliminations.replace(/,/g, '')) / parseInt(allHeroes.Deaths.replace(/,/g, ''))).toFixed(2);
                    embed.addField('Skill Rating', "**" + info.competitive.rank + "**", true);
                    embed.addField('Playtime', info.playtime.competitive, true);
                    embed.addField('Games', allHeroes.GamesPlayed + " (" + orZero(allHeroes.GamesWon) + ":" + orZero(allHeroes.GamesTied) + ":" + orZero(allHeroes.GamesLost) + ")", true);
                    embed.addField('Kills', allHeroes.FinalBlows, true);
                    embed.addField('Eliminations', allHeroes.Eliminations, true);
                    embed.addField('Deaths', allHeroes.Deaths, true);
                    embed.addField('Elims/Deaths', kd, true);
                    embed.addField('Medals', allHeroes.Medals + " (" + allHeroes.Medals_Gold + "/" + allHeroes.Medals_Silver + "/" + allHeroes.Medals_Bronze + ")", true);
                    embed.addField('Cards', allHeroes.Cards, true);
                    return [4 /*yield*/, owapi_1.getCompHeroDetails(battletag, region, platform, top5)];
                case 3:
                    heroDetails = _b.sent();
                    Object.keys(heroDetails).forEach(function (name) {
                        var hero = heroDetails[name];
                        var time = hero.TimePlayed ? hero.TimePlayed : '0minutes';
                        var str = time.replace(/([0-9]+)([a-zA-Z]+)/, '$1 $2') + ": " + hero.WinPercentage + " wins";
                        embed.addField(owapi_1.convertNames.toDisplay(name), str);
                    });
                    context.responseConfig.embeds = [embed];
                    context.responseConfig.useEmbed = true;
                    return [2 /*return*/, ' '];
            }
        });
    }); }
});
//# sourceMappingURL=info.js.map