import { Message, PermissionResolvable } from 'discord.js';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, Collection<string, number>>;
  }

  export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    args?: boolean;
    usage?: string;
    guildOnly?: boolean;
    cooldown?: number;
    permissions?: PermissionResolvable;
    options?: ApplicationCommandOption[];
    execute: (
      message: CommandInteraction,
      options?: CommandInteractionOptionResolver
    ) => void;
  }
}
