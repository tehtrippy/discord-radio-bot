# Discord FM101 Bot

A discord bot that streams FM101 to discord voice channels.

## Setup

1. Install dependencies

   ```bash
   # install ffmpeg
   sudo apt-get install ffmpeg
   $ yarn install
   ```

   note: if you have problems with installing node-sodium, please view the reference link below.

2. Create .env file

   ```env
   BOT_TOKEN=TOKEN_HERE
   GUILD_ID=GUILD_ID_HERE
   BROADCAST_CHANNEL_ID=BROADCAST_CHANNEL_ID_HERE
   STREAM_URL=https://media.login.in.th:8443/smilehost/8135
   ```

## Development

```bash
$ yarn dev
```

## Production

```bash
$ yarn build
$ yarn start
```

## References

1. Discord.js Libary - <https://discord.js.org/>
2. Problem with installing node-sodium - <https://github.com/paixaop/node-sodium/issues/96>

   ```bash
   $ brew install libtool autoconf automake
   $ apt-get install autoconf automake g++ libtool
   ```
