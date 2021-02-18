import { CommandMessage, Discord, CommandNotFound } from '@typeit/discord';
import { User, MessageEmbed } from 'discord.js';
import Path from 'path';

export default class baseclass {

    public async random_color(): Promise<string> {
        return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, `0`)}`;
    }

    public async has_perm(command: CommandMessage, permision: string | any): Promise<boolean> {
        if (command.member?.permissions.has(permision)) {
            return true
        } else return false
    }

    public async color_send(command: CommandMessage, msg: string): Promise<void> {
        let embed = new MessageEmbed()
        .setColor(await this.random_color())
        .setDescription(msg);
        command.channel.send(embed);
    }

    public issue(command: CommandMessage, msg: string | null = null) {
        if (msg) {
            command.channel.send(`Something went wrong\n\ndetails: \n${msg}`)
        } else {
            command.channel.send(`Something went wrong`)
        }
    }

    public async index_member_nicks(command: CommandMessage, opts: {[key: string]: any} = {nick: ""}, callback: Function | null = null): Promise<Array<User>> {
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

    public async latency(command: CommandMessage): Promise<{[key: string]: number}> {
        return {
            ws: Math.round(command.client.ws.ping),
            bot: Date.now() - command.createdTimestamp
        }
    }
}
