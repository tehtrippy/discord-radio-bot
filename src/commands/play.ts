import { Command } from 'discord.js';
import { radioStreaming } from '../streaming';

const command: Command = {
  name: 'play',
  description: 'Join my voice channel and play',
  permissions: ['ADMINISTRATOR'],
  execute: async (interaction) => {
    radioStreaming();
    interaction.reply({ content: 'Playback has started!', ephemeral: true });
  },
};

export default command;
