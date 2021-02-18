import {
    Command,
    CommandMessage,
    Discord,
    Infos
} from "@typeit/discord"

import { User } from "discord.js"

const getInfo = (description: string): {description: string, commandClass: string} => {
    return {
        description: description,
        commandClass: "Fun"
    }
}


import baseclass from "../baseclass";

export default abstract class fun extends baseclass {

    @Command(`defys`)
    @Infos(getInfo(`Command that tells you how many defys are in the server`))
    private async defys(command: CommandMessage): Promise<void> {
        this.index_member_nicks(
            command, 
            {
                nick: `defy`
            },
            async (response: Array<User>): Promise<void> => {
                this.color_send(command, `There are ${response.length} defys`)
            }
        )
    }

}