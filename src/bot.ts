import {
    Discord,
    CommandNotFound,
    Client
} from '@typeit/discord';
import  { config } from 'dotenv';
import { type } from 'os';
import * as commands from './commands';

const unparsedconf: any = config();
const conf = unparsedconf.parsed;
const token: string = conf.TOKEN;

export default async function start(): Promise<void> {
    const client = new Client({
        classes: [
            `${__dirname}/*commands.ts`,
          `${__dirname}/*commands.js`
        ],
        silent: false,
        variablesChar: ":"
      });
    await client.login(token)
}