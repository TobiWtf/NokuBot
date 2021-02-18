import {
    Command,
    CommandMessage,
    Discord
} from "@typeit/discord"

import { User } from "discord.js"

import baseclass from "../baseclass";

export default abstract class fun extends baseclass {

    @Command(`defys`)
    private async defys(command: CommandMessage): Promise<void> {
        this.index_member_nicks(
            command, 
            {
                nick: `defy`
            },
            (response: Array<User>): void => {
                this.color_send(command, `There are ${response.length} defys`)
            }
        )
    }

}