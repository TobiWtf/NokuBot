import {
    Discord,
    CommandNotFound,
    Client
} from '@typeit/discord';
import  { config } from 'dotenv';

interface conf {
    [key: string]: string
}

const unparsedconf: any = config();
const conf: conf = unparsedconf.parsed;
const token: string = conf.TOKEN;

const client: Client = new Client(
    {
        classes: [
            `${__dirname}/*commands.ts`,
            `${__dirname}/*commands.js`
        ],
        silent: false,
        variablesChar: `:`
    }
)

export default async function start() {
    await client.login(token)
}