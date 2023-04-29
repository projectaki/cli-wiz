export function typedKeys<T extends {}>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}