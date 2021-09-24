import Discord from 'discord.js';
import dotenv from 'dotenv';
import { slashCommands } from './slash';

dotenv.config();
if (!process.env.BOT_TOKEN || !process.env.GUILD_ID) process.exit(0);

export const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
});

slashCommands();

client.login(process.env.BOT_TOKEN);
