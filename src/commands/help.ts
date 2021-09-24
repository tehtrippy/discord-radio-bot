import { Command, ApplicationCommandOptionChoice } from 'discord.js';
import commands from './index';

const choices: ApplicationCommandOptionChoice[] = [
  {
    name: 'ping',
    value: '0',
  },
  {
    name: 'play',
    value: '1',
  },
  {
    name: 'leave',
    value: '2',
  },
  {
    name: 'listener-info',
    value: '3',
  },
];

const command: Command = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  options: [
    {
      name: 'commands',
      description: 'commands list',
      type: 'STRING',
      required: true,
      choices,
    },
  ],
  execute(interaction, options) {
    if (!options) {
      interaction.reply({
        content: 'Please choose commands.',
        ephemeral: true,
      });
    }

    if (options) {
      const data = [];
      const { value } = options.data[0];
      const helpingCommand = commands[Number(value)];
      const { name, aliases, description, usage, cooldown } = helpingCommand;

      data.push(`**Name:** ${name}`);
      if (aliases) data.push(`**Aliases:** ${aliases.join(', ')}`);
      if (description) data.push(`**Description:** ${description}`);
      if (usage) data.push(`**Usage:** ${usage}`);
      data.push(`**Cooldown:** ${cooldown || 3} second(s)`);
      interaction.reply({ content: data.join('\n'), ephemeral: true });
    }
  },
};

export default command;
