import { client } from '../index';

import {
  createAudioResource,
  createAudioPlayer,
  VoiceConnection,
  joinVoiceChannel,
  AudioResource,
  DiscordGatewayAdapterCreator,
  NoSubscriberBehavior,
  VoiceConnectionStatus,
  entersState,
} from '@discordjs/voice';

export const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Play,
  },
});

export let resource: AudioResource;

export let connection: VoiceConnection;

const connectToChannel = async () => {
  const { GUILD_ID, BROADCAST_CHANNEL_ID } = process.env;
  if (!BROADCAST_CHANNEL_ID) {
    console.error('Please set BROADCAST_CHANNEL_ID ENV');
    return;
  }

  if (!GUILD_ID) {
    console.error('Please set GUILD_ID ENV');
    return;
  }

  const guild = client.guilds.cache.get(process.env.GUILD_ID as any);

  if (!guild) {
    console.error('Get guild error');
    return;
  }

  connection = joinVoiceChannel({
    channelId: BROADCAST_CHANNEL_ID,
    guildId: GUILD_ID,
    adapterCreator: guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
  });
  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
  } catch (error) {
    connection.destroy();
    await radioStreaming();
    throw error;
  }
};

export const radioStreaming = async () => {
  const { STREAM_URL } = process.env;
  if (!STREAM_URL) {
    console.error('Please set STREAM_URL ENV');
    return;
  }
  try {
    await connectToChannel();
    resource = createAudioResource(STREAM_URL);
    connection.subscribe(player);
    player.play(resource);
    player.on('error', async () => {
      console.log('playback error reconnecting....');
      await radioStreaming();
    });
  } catch (err) {
    console.log('err: ', err);
  }
};
