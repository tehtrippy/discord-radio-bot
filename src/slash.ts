import { client } from './index';
import commands from './commands';
import { radioStreaming } from './streaming';

export const slashCommands = () => {
  client.on('ready', async () => {
    console.log('Ready!');

    await radioStreaming();

    const { application } = client;

    if (application) {
      if (!application.owner) await application.fetch();
      const data = commands.map((command) => ({
        name: command.name,
        description: command.description,
        options: command.options,
      }));

      await client.guilds.cache
        .get(process.env.GUILD_ID as any)
        ?.commands.set(data);

      client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const { options } = interaction;

        try {
          for (const command of commands) {
            if (interaction.commandName === command.name) {
              if (command.permissions && interaction.channel) {
                let authorPerms =
                  interaction.channel.type !== 'DM'
                    ? interaction.channel.permissionsFor(interaction.user)
                    : null;

                if (!authorPerms || !authorPerms.has(command.permissions)) {
                  return interaction.reply({
                    content: 'You can not do this!',
                    ephemeral: true,
                  });
                }
              }
              command.execute(interaction, options);
            }
          }
        } catch (error) {
          console.error(error);
          interaction.reply(
            'there was an error trying to execute that command!'
          );
        }
      });
    }
  });
};
