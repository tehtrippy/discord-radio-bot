import { Command } from 'discord.js';
import { AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';
import { player, connection } from '../streaming';

const command: Command = {
  name: 'listener-info',
  description: 'Display info about yourself.',
  execute: async (interaction) => {
    const { status: playerStatus } = player.state;
    const { status: connectionStatus } = connection.state;

    if (connectionStatus !== VoiceConnectionStatus.Ready) {
      interaction.reply({
        content: 'Bot not joining any voice channel',
        ephemeral: true,
      });
      return;
    }

    if (playerStatus !== AudioPlayerStatus.Playing) {
      interaction.reply({
        content: 'Playback is not playing',
        ephemeral: true,
      });
      return;
    }

    interaction.reply({
      content: `below is your requested information:\nStatus: ${playerStatus}`,
      ephemeral: true,
    });
  },
};

export default command;
