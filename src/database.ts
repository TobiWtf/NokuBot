import lowlib = require('lowdb');
import filesync = require('lowdb/adapters/FileSync');

import {
    CommandMessage
} from '@typeit/discord'

export default class database {
    private _filesync: any
    private _db: any

    constructor(fileName: string) {
        this._filesync = new filesync(fileName);
        this._db = () => lowlib(this._filesync);
        this._db().defaults({reactions: []}).write()
    }

    public async reaction_listener_add(command: CommandMessage, message_id: string, role_id: string): Promise<void> {
        this._db().get('reactions')
        .push({
            guild: command.guild?.id,
            message: message_id,
            role: role_id
        })
        .write()
    }

    public async find_reaction_listener(reaction: any): Promise<any> {
        return this._db().get(`reactions`)
            .find({
                guild: reaction.message.guild.id,
                message: reaction.message.id
            })
            .value()
    }

}
