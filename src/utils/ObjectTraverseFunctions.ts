import * as _ from "lodash";

export function traversePrototypeChain(object: any, callback: (object: any) => void): void {
    if (!isObjectLike(object)) {
        return;
    }
    let prototype: any = object;
    while (prototype !== null && prototype !== Object.prototype) {
        callback(prototype);
        prototype = Object.getPrototypeOf(prototype);
    }
}

export function traverseObjectOwnProperties(object: any, callback: (property: string) => void): void {
    if (!isObjectLike(object)) {
        return;
    }
    Object.getOwnPropertyNames(object).forEach((name: string) => {
        callback(name);
    });
}

export function isObjectLike(object: any): boolean {
    return _.isObject(object) || _.isObjectLike(object) || _.isFunction(object);
}
