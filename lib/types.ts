import { RichEmbed, Message } from 'discord.js';

export interface ResponseConfig {
  channel: string;
  useEmbed: boolean;
  embed: RichEmbed
}
export interface Context {
  responseConfig: ResponseConfig;
  msg: Message
}
