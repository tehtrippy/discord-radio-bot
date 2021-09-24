import { Command } from 'discord.js';
import { AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';
import { player, connection } from '../streaming';

const command: Command = {
  name: 'leave',
  description: 'Leave voice channel from current guild',
  permissions: ['ADMINISTRATOR'],
  execute(interaction) {
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
      content: 'Playback has stoped! and Disconnect!',
      ephemeral: true,
    });
    connection.disconnect();
  },
};

export default command;
