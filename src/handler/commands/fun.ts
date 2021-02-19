/**
 * Normal imports
 */
import {
    Command,
    CommandMessage,
    Infos
} from '@typeit/discord'

import { User, MessageEmbed } from 'discord.js'

/**
 * Default imports
 */
import baseclass from '../baseclass';

/**
 * Glob, used to determine grouping with help command
 */
let commandClass = 'Fun';

export default abstract class fun extends baseclass {

    /**
     * Iterates over the member list and tells you how many people have "defy" in their name
     * @param command
     */
    @Command(`defys :index`)
    @Infos({
        commandClass: commandClass,
        args: [`name`],
        description: `Tells you how many defys there are in the server`,
        usage: [`defys`, `defys [name]`]
    })
    private async defys(command: CommandMessage): Promise<void> {
        this.index_member_nicks(
            command,
            {
                nick: command.args.index || `defy`
            },
            async (response: Array<User>): Promise<void> => {
                if (response.length == 1) {
                    this.color_send(command, `There is ${response.length} ${command.args.index || `defy`}`)
                } else this.color_send(command, `There are ${response.length} ${command.args.index || `defy`}'s`)
            }
        )
    }

    /**
     * Makes a magic 8ball respond to a question
     * @param command
     * @param question
     */
    @Command(`8ball :question`)
    @Infos({
        commandClass: commandClass,
        args: "question",
        description: `Answers a yes or no question using a magic 8ball`,
        usage: `8ball <question>`
    })
    private async eightball(command: CommandMessage): Promise<void> {
      if (command.args.question) {
        let responses: Array<string> = [
          `As I see it, yes.`,
          `Ask again later.`,
          `Better not tell you now.`,
          `Cannot predict now.`,
          `Concentrate and ask again`,
          `Don’t count on it.`,
          `It is certain.`,
          `It is decidedly so.`,
          `Most likely.`,
          `My reply is no.`,
          `My sources say no.`,
          `Outlook not so good.`,
          `Outlook good.`,
          `Reply hazy, try again.`,
          `Signs point to yes.`,
          `Very doubtful.`,
          `Without a doubt.`,
          `Yes.`,
          `Yes – definitely.`,
          `You may rely on it.`,
        ]
      let embed = new MessageEmbed()
      .setColor(await this.random_color())
      .setTitle(await this.unparsed_args(command))
      .setDescription(responses[Math.floor(Math.random() * responses.length)])
      command.channel.send(embed)
      return
      }
    /**
     * Defaults if no question is asked
     */
     let embed = new MessageEmbed()
     .setColor(await this.random_color())
     .setTitle(`Did I forget to ask a question?`)
     .setDescription(`Yes.`)
     command.channel.send(embed)
     return
    }

}
