import {
    Discord,
    On,
    Client,
    Command,
    CommandMessage,
    CommandNotFound
} from '@typeit/discord';
import { User } from 'discord.js';

@Discord('n!')
export abstract class discordApp {

    private issue(command: any, msg: string | null = null) {
        if (msg) {
            command.channel.send(`Something went wrong\n\ndetails: \n${msg}`)
        } else {
            command.channel.send(`Something went wrong`)
        }
    }

    private async index_member_nicks(command: any, opts={nick: ""}, callback: any = null): Promise<Array<User>> {
        let members = await command.guild?.members.fetch();
        let users: Array<User> = [];
        if (!members) {
            this.issue(command, `No member object found`)
        } else {
            members?.forEach(
                (index: any) => {
                    let name = index.nickname;
                    let user: User = index.user;
                    if (!name) name = user.username;
                    if (!name) return;
                    name = name.toLowerCase();
                    if (name.includes(opts.nick)) users.push(user)
                }
            );
        }
        if (callback) {
            callback(users)
        } 
        return users
    }

    @Command("ping")
    async ping(command: CommandMessage): Promise<void> {
        command.reply("Pong!!"); /* 
            Add timestamps to response
        */
    };

    @Command("defys")
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
    async notfound(command: CommandMessage): Promise<void> {
        command.reply('Command not found')
    }
}