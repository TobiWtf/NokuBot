import {
    Discord,
    On,
    Client,
    Command,
    CommandMessage,
    CommandNotFound,
    Infos
} from '@typeit/discord';

import { 
    User, 
    MessageEmbed 
} from 'discord.js';

import database from './database';

import default_class from './commands_class';

var nokubase = new database();

@Discord(`n!`)
export abstract class normal extends default_class {

    @Command(`ping`)
    private async ping(command: CommandMessage): Promise<void> {
        let latency: {[key: string]: number} = await this.latency(command);
        this.color_send(command, `Bot latency is ${latency.bot}ms Websocket latency is ${latency.ws}ms`)
    }

    @Command(`defys`)
    private async defys(command: CommandMessage): Promise<void> {
        this.index_member_nicks(
            command, 
            {
                nick: `defy`
            },
            (response: Array<User>): void => {
                command.channel.send(`There are ${response.length} defys`)
            }
        )
    }

    @CommandNotFound()
    private async notfound(command: CommandMessage): Promise<void> {
        command.reply('Command not found')
    }
}