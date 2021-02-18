export interface command {
    [key: string]: any,
    infos?: {} | any,
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