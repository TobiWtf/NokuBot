import { User } from 'discord.js';

export default abstract class default_class {

    public issue(command: any, msg: string | null = null) {
        if (msg) {
            command.channel.send(`Something went wrong\n\ndetails: \n${msg}`)
        } else {
            command.channel.send(`Something went wrong`)
        }
    }

    public async index_member_nicks(command: any, opts: {[key: string]: any} = {nick: ""}, callback: any = null): Promise<Array<User>> {
        let members = await command.guild?.members.fetch();
        let users: Array<User> = [];
        if (!members) {
            this.issue(command, `No member object found`)
        } else {
            members?.forEach(
                (index: any) => {
                    let name = index.nickname;
                    let user: User = index.user;
                    if (!name) name = user.username;
                    if (!name) return;
                    name = name.toLowerCase();
                    if (name.includes(opts.nick)) users.push(user)
                }
            );
        }
        if (callback) {
            callback(users)
        } 
        return users
    }

    public async latency(command: any): Promise<{ws: number, bot: number}> {
        return {
            ws: Math.round(command.client.ws.ping),
            bot: Date.now() - command.createdTimestamp
        }
    }
}
