import { Context } from './types';
export const responseToSameChannel = (context: Context): Context => {
  context.responseConfig.channel = context.msg.channel.id;
  return context;
}
