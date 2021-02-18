/**
 * Normal imports
 */
import {
    Command,
    CommandMessage,
    Infos
} from '@typeit/discord';

import { 
    MessageEmbed
} from 'discord.js'

import { 
    command, 
    infos 
} from '../interfaces'

/**
 * Default imports
 */
import prefix from '../config';
import baseclass from '../baseclass';

/**
 * Used to determine group for help command
 */
let commandClass = `Info`;

export default abstract class info extends baseclass {
    
    /**
     * Ping command, returns latency information for the bot and websocket
     * @param command 
     */
    @Command(`ping`)
    @Infos({
        commandClass: commandClass,
        args: null,
        description: `pong!!`,
        usage: `ping`
    })
    private async ping(command: CommandMessage): Promise<void> {
        let latency: {[key: string]: number} = await this.latency(command);
        this.color_send(command, `Bot latency is ${latency.bot}ms Websocket latency is ${latency.ws}ms`)
    }

    /**
     * Help command, returns details about commands and a list of commands
     * Index indexes a specific command to call on
     * @param command 
     * @param index
     */
    @Command(`help :index`)
    @Infos({
        commandClass: commandClass,
        args: [`command-name`],
        description: `provides details about commands`,
        usage: [`help`, `help [command-name]`]
    })
    private async help(command: CommandMessage): Promise<void> {
        if (command.args.index) {
            /**
             * Checks for index argument, and iterates over commands to find a specific one.
             */
            let indexed_command: command | null = await this.index_commands(command.args.index);
            if (indexed_command) {
                let args: string | null, usage: string | null;
                if (indexed_command.infos.args) {
                    args = indexed_command.infos.args.join(`, `)
                } else {
                    args = null;
                }
                if (indexed_command.infos.usage) {
                    if (Array.isArray(indexed_command.infos.usage)) {
                        let new_command_usages: Array<string> = [];
                        for (let index in indexed_command.infos.usage) {
                            new_command_usages.push(prefix + indexed_command.infos.usage[index])
                        }
                        usage = new_command_usages.join(`\n`)
                    } else {
                        usage = prefix + indexed_command.infos.usage
                    }
                } else {
                    usage = null
                }
                /**
                 * Creates embeded message to-send and adds information about the command
                 */
                let command_name: string = indexed_command.commandName.split(" ")[0];
                command_name = command_name.replace(command_name[0], command_name[0].toUpperCase())
                let embed = new MessageEmbed()
                .setColor(await this.random_color())
                .setTitle(command_name);
                if (indexed_command.infos.description) {
                    embed.addField(`Description`, indexed_command.infos.description);
                }
                if (args) {
                    embed.addField(`Args`, args)
                }
                if (usage) {
                    embed.addField(`Usage/s`, usage)
                }
                if (indexed_command.infos.commandClass) {
                    embed.addField(`Grouping`, indexed_command.infos.commandClass)
                }
                embed.setFooter(`args <required> [optional]\ndon't include <>[] in command`)
                command.channel.send(embed)
                return
            } else {
                this.color_send(command, `${command.args.index} not found`)
                return
            }
        }
        /**
         * Defaults if index argument is not included
         */
        let commands: Array<command> = await this.get_commands();
        /**
         * Command index for grouping properly in embeded messsage
         */
        let commands_index: {[key: string]: Array<string>} = {}; 
        for (let index in commands) {
            let command: command = commands[index];
            let command_infos: infos = command.infos;
            if (command_infos.commandClass) {
                if (commands_index[command_infos.commandClass]) {
                    commands_index[command_infos.commandClass].push(command.commandName.split(" ")[0])
                } else {
                    commands_index[command_infos.commandClass] = [];
                    commands_index[command_infos.commandClass].push(command.commandName.split(" ")[0])
                }
            }
        }
        let embed = new MessageEmbed()
        .setColor(await this.random_color())
        .setTitle(`Help`);

        for (let key in commands_index) {
            embed
            .addField(
                key,
                commands_index[key].join("\n"),
                true
            )
        }
        command.channel.send(embed)
    }

}