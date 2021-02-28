
import baseclass from '../baseclass';

import {
    Command,
    CommandMessage,
    Infos
} from '@typeit/discord'

import {
    Role,
    MessageReaction
} from 'discord.js'

import database from '../../database'
const nokubase = new database('bot.json')

let commandClass = 'Admin'

export default abstract class admin extends baseclass {
    @Command("role :role :emoji")
    @Infos({
        commandClass: commandClass,
        args: ['role', 'emote', 'message'],
        description: 'Add role-reaction message',
        usage: ['role <:smile:> <@role> [your message for bot to send]']
    })
    private async test(command: CommandMessage): Promise<void> {
        this.is_admin(command, async () => {
            let args = (await this.unparsed_args(command)).split(" ")
            args.shift(), args.shift();
            let role_id = command.args.role.replace(/<|>|@|&/g, "")
            let emoji = command.args.emoji;
            let role: Role | undefined = command.guild?.roles?.cache.find(role => {
                 return role_id == role 
            })
            if (!role) {
                this.color_send(command, `Role not found`)
                return
            } else {
                let message = await (await this.color_send(command, args.join(" ")))
                try {
                    let reaction: MessageReaction = await message.react(emoji);
                    nokubase.reaction_listener_add(command, reaction.message.id, role_id)
                } catch (err: any) {
                    this.color_send(command, `${emoji} not found`);
                }
            }
        })
    }
}