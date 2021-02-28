export interface command {
    [key: string]: any,
    infos?: { 
        commandClass?: string,
        description?: string,
        args?: Array<string> | null,
        usage?: Array<string> | string
    } | any,
    description?: string | any,
    argsRules?: Array<Function> | any,
    prefix?: string | any,
    commandName?: string | any
}

export interface conf {
    TOKEN: string
}

export interface infos {
    [key: string]: any,
    description?: string,
    commandClass?: string
}
