import {
    Command,
    CommandMessage,
    Description,
    Infos,
    Client
} from "@typeit/discord"
import baseclass from "../baseclass";
import { Message, MessageEmbed } from 'discord.js'
import { command, infos } from '../interfaces'
import { EBADF } from "constants";

const getInfo = (description: string): {description: string, commandClass: string} => {
    return {
        description: description,
        commandClass: "Info"
    }
}

export default abstract class info extends baseclass {
    
    @Command(`ping`)
    @Infos(getInfo(`Ping command`))
    private async ping(command: CommandMessage): Promise<void> {
        let latency: {[key: string]: number} = await this.latency(command);
        this.color_send(command, `Bot latency is ${latency.bot}ms Websocket latency is ${latency.ws}ms`)
        console.log(await this.index_commands("ping"))
    }

    @Command(`help`)
    @Infos(getInfo(`Help command`))
    private async help(command: CommandMessage): Promise<void> {
        let commands: Array<command> = await this.get_commands();
        let commands_index: {[key: string]: Array<string>} = {};
        for (let index in commands) {
            let command: command = commands[index];
            let command_infos: infos = command.infos;
            if (command_infos.commandClass) {
                if (commands_index[command_infos.commandClass]) {
                    commands_index[command_infos.commandClass].push(command.commandName)
                } else {
                    commands_index[command_infos.commandClass] = [];
                    commands_index[command_infos.commandClass].push(command.commandName)
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
                false
            )
        }
        command.channel.send(embed)
    }

}