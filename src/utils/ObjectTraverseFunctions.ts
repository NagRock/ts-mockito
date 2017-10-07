import * as _ from "lodash";

export class ObjectTraverser {
    public traversePrototypeChain(object: any, callback: (object: any) => void): void {
        if (!this.isObjectLike(object)) {
            return;
        }
        let prototype: any = object;
        while (prototype !== null && prototype !== Object.prototype) {
            callback(prototype);
            prototype = Object.getPrototypeOf(prototype);
        }
    }

    public traverseObjectOwnProperties(object: any, callback: (property: string) => void): void {
        if (!this.isObjectLike(object)) {
            return;
        }
        Object.getOwnPropertyNames(object).forEach((name: string) => {
            callback(name);
        });
    }

    public isObjectLike(object: any): boolean {
        return _.isObject(object) || _.isObjectLike(object) || _.isFunction(object);
    }
}
