'use strict';
require('node-sigint');

import { Context } from './types';
import {Logger } from './logger';

const log = Logger.create('base');

log.log('this is the base logger');

log.sub('part').log('this is a part logger')

const fs = require('fs');
const Clapp = require('./modules/clapp-discord');
const cfg = require('../config.js');
const pkg = require('../package.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

var http = require('http');
var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Nothing to see here \n");
});
server.listen(process.env.PORT);

var app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (msg, context: Context) => {
    // Fired when input is needed to be shown to the user
    if (context.responseConfig.channel) {
      if (context.responseConfig.useEmbed) {
        context.responseConfig.embeds.reduce((acc, curr) => {
          return bot.channels.get(context.responseConfig.channel).sendEmbed(curr).catch(err => console.log(err.message));
        }, Promise.resolve())
        // bot.channels.get(context.responseConfig.channel).sendEmbed(context.responseConfig.embed).catch(err => console.log(err.message));
      } else {
        bot.channels.get(context.responseConfig.channel).sendMessage(msg);
      }
    } else {
      context.msg.reply('\n' + msg).then(bot_response => {
        if (cfg.deleteAfterReply.enabled) {
          context.msg.delete(cfg.deleteAfterReply.time)
            .then(msg => console.log(`Deleted message from ${msg.author}`))
            .catch(console.log);
          bot_response.delete(cfg.deleteAfterReply.time)
            .then(msg => console.log(`Deleted message from ${msg.author}`))
            .catch(console.log);
        }
      });
    }
  }
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  if (file.endsWith('.js')) {
    var command = require("./commands/" + file);
    if (command.default) {
      app.addCommand(command.default);
    } else {
      app.addCommand(command);
    }
  }
});

bot.on('ready', () => console.log('ready'));

bot.on('message', msg => {
  // Fired when someone sends a message

  if (app.isCliSentence(msg.content)) {
    app.parseInput(msg.content, {
      msg: msg,
      responseConfig: {
        channel: undefined
      }
      // Keep adding properties to the context as you need them
    });
  }
});

bot.login(cfg.token).then(() => {
  console.log('Running! on windows');
  bot.user.setPresence({
    game: { name: cfg.prefix }
  }).then((client) => {
    console.log('presence set', client.localPresence);
  });
});

function exit() {
  console.log('exiting');
  bot.user.setPresence({
    status: 'invisible'
  });
}

process.on('exit', () => exit());

if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    console.log('win sigint');
    process.emit("SIGINT");
  });
}

process.on('SIGHUP', () => process.exit());
process.on('SIGTERM', () => process.exit());
process.on('SIGBREAK', () => process.exit());

process.on('SIGINT', function () {
  console.log('normal sigint');
  process.exit();
  // bot.user.setPresence({
  //   status: 'invisible'
  // }).then((result) => {
  //   console.log('user: ', result.localPresence);
  //   process.exit();
  // });
});
