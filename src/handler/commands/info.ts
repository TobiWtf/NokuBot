import {
    Command,
    CommandMessage,
    Discord,
    CommandNotFound
} from "@typeit/discord"
import baseclass from "../baseclass";


export default abstract class info extends baseclass {

    @Command(`ping`)
    private async ping(command: CommandMessage): Promise<void> {
        let latency: {[key: string]: number} = await this.latency(command);
        this.color_send(command, `Bot latency is ${latency.bot}ms Websocket latency is ${latency.ws}ms`)
    }

}