import {
    Client
} from '@typeit/discord';
import  { config } from 'dotenv';
import { conf } from './handler/interfaces'
const unparsedconf: any = config();
const conf: conf = unparsedconf.parsed;
const token: string = conf.TOKEN;

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


export default async function start() {
    await client.login(token)
}