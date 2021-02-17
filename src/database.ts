import sqlite = require("better-sqlite3");
import EventEmitter from 'events';
const events = new EventEmitter();

const executions: Array<string> = [];
function prepare(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): any {
    executions.push(descriptor.value())
}

export default class database {
    database: any;

    constructor(path: string = "database.db", opts = {}) {
        this.database = sqlite(path, opts);
        this.prepare()
    };

    public async prepare(): Promise<void> {
        executions.forEach(
            async (element: string) => {
                console.log(await element)
                this.database.exec(await element)
            }
        );
    }

    @prepare
    private static async test(): Promise<string> {
        return "CREATE TABLE IF NOT EXISTS newlol (test INT, bruh TEXT)";
    }
}