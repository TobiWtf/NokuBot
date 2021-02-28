import {
    Client, 
    Command
} from '@typeit/discord';
import { Role, MessageEmbed } from 'discord.js'
import  { config } from 'dotenv';
import { conf } from './handler/interfaces'
const unparsedconf: any = config();
const conf: conf = unparsedconf.parsed;
const token: string = conf.TOKEN;

import database from './database'
const nokubase = new database('bot.json')

const client: Client = new Client(
    {
        classes: [
            `${__dirname}/handler/*index.ts`,
            `${__dirname}/handler/*index.js`
        ],
        silent: false,
        variablesChar: `:`
    }
)

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.me) {
        return
    }
    let listener = await nokubase.find_reaction_listener(reaction);
    if (listener) {
        let role: Role | undefined = reaction.message.guild?.roles?.cache.find(role => {
            return listener.role == role 
       })
       if (role) {
            reaction.message.guild?.member((await user.fetch()))?.roles.add(role)
            .catch(err => {
                if (!user.dmChannel) {
                    user.createDM()
                }
                let message = new MessageEmbed()
                .setColor((() => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, `0`)}`)())
                .setDescription(err.message)
                user.dmChannel?.send(message)
            })
           
       }
    }
})

export default async function start() {
    await client.login(token)
}