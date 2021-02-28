import { CommandMessage, Client } from '@typeit/discord';
import { User, MessageEmbed } from 'discord.js';
import { command } from './interfaces'
import prefix from './config'

export default class baseclass {

    /**
     * iterates over the list of client commands, and returns the specific command when one is applied.
     * @param index
     */
    public async index_commands(index: string): Promise<command | null> {
        let commands: Array<command> = Client.getCommands();
        for (let key in commands) {
            let command: command = commands[key];
            if (command.commandName.split(` `)[0] == index.toLowerCase()) {
                return command
            }
        }
        return null
    }

    public async unparsed_args(command: CommandMessage): Promise<string> {
        let command_content = command.content.split(" ");
        command_content.shift()
        return command_content.join(" ")
    }

    /**
     * Wrapper for client commands as commands class extends baseclass
     */
    public async get_commands(): Promise<Array<command>> {
        return Client.getCommands()
    }

    /**
     * returns a random 6 digit hexidecimal string for color coding
     */
    public async random_color(): Promise<string> {
        return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, `0`)}`;
    }
    
    /**
     * Wrapper for the discord.js libs permission checker, will be used to check for admin access for admin commands.
     * @param command 
     * @param permision 
     */
    public async has_perm(command: CommandMessage, permision: string | any): Promise<boolean> {
        if (command.member?.permissions.has(permision)) {
            return true
        } else return false
    }


    /**
     * Checks for perm and preforms call, else tells them to fuck off
     * @param command 
     * @param callback 
     */
    public async is_admin(command: CommandMessage, callback: Function | any): Promise<void> {
        if (await this.has_perm(command, `ADMINISTRATOR`)) {
            callback()
        } else this.color_send(command, `You are not an admin rekt`)
    }

    /**
     * Default command send for most messages, gets a random color and sets description as message argument
     * @param command 
     * @param msg 
     */
    public async color_send(command: CommandMessage, msg: string): Promise<any> {
        let embed = new MessageEmbed()
        .setColor(await this.random_color())
        .setDescription(msg);
        return command.channel.send(embed);
    }

    /**
     * Hasnt been implemented much yet, needs further testing.
     * @param command 
     * @param msg 
     */
    public issue(command: CommandMessage, msg: string | null = null) {
        if (msg) {
            command.channel.send(`Something went wrong\n\ndetails: \n${msg}`)
        } else {
            command.channel.send(`Something went wrong`)
        }
    }

    /**
     * iterates over the list of members and returns a list of members with the index im their name based on opts nick identifier
     * @param command 
     * @param opts 
     * @param callback 
     */
    public async index_member_nicks(command: CommandMessage, opts: {[key: string]: any} = {nick: ``}, callback: Function | null = null): Promise<Array<User>> {
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

    /**
     * returns latency object
     * @param command 
     */
    public async latency(command: CommandMessage): Promise<{[key: string]: number}> {
        return {
            ws: Math.round(command.client.ws.ping),
            bot: Date.now() - command.createdTimestamp
        }
    }
}
