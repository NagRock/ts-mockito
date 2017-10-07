export function traversePrototypeChain(object: any, callback: (object: any) => void): void {
    let prototype: any = object;
    while (prototype !== null && prototype !== Object.prototype) {
        callback(prototype);
        prototype = Object.getPrototypeOf(prototype);
    }
}

export function traverseObjectOwnProperties(object: any, callback: (property: string) => void): void {
    try {
        Object.getOwnPropertyNames(object).forEach((name: string) => {
            callback(name);
        });
    } catch (error) {
        // es5 can throw an error when getOwnPropertyNames is called on primitives
    }
}
