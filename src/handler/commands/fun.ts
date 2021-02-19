/**
 * Normal imports
 */
import {
    Command,
    CommandMessage,
    Infos
} from '@typeit/discord'

import { User } from 'discord.js'

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
}