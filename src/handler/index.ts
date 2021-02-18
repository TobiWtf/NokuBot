import { CommandMessage, Discord, CommandNotFound } from '@typeit/discord';
import { User, MessageEmbed } from 'discord.js';
import Path from 'path';
import baseclass from "./baseclass"
import prefix from "./config"

@Discord(prefix, {
    import: [
      Path.join(__dirname,  "commands", '*.ts')
    ]
  }
)
export default class extends baseclass  {
    @CommandNotFound()
    public async notfound(command: CommandMessage) {
        this.color_send(command, `${command.content.split(prefix).pop()?.split(" ")[0]} not found`)
        console.log(command.commandContent)
    }
}
