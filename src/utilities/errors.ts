export function ThrowUnrecognizedError(item: never, type: string): never {
    throw new Error(`Unrecognized ${type}: '${item}'.`);
}
