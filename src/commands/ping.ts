import { Command } from 'discord.js';

const command: Command = {
  name: 'ping',
  description: 'Ping!',
  execute(interaction) {
    interaction.reply({
      content: `API Latency is ${Math.round(interaction.client.ws.ping)}ms`,
      ephemeral: true,
    });
  },
};

export default command;
