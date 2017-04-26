import uuid = require("node-uuid");
export interface KeyedItem {
    Key: string;
}

export function WithKey<T extends object>(item: T): T & KeyedItem {
    return {...(item as object), Key: uuid.v4()} as any;
}