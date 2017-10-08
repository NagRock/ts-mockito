import * as _ from "lodash";

export class ObjectTraverser {
    public traverseClassInheritanceChain(clazz: any, callback: (clazz: any) => void): void {
        if (!_.isFunction(clazz)) {
            return;
        }
        let prototype: any = new clazz();
        while (prototype !== null && prototype !== Object.prototype) {
            callback(prototype.constructor);
            prototype = Object.getPrototypeOf(prototype);
        }
    }

    public traversePrototypeChain(object: any, callback: (object: any) => void): void {
        if (!_.isObject(object)) {
            return;
        }
        let prototype: any = object;
        while (prototype !== null && prototype !== Object.prototype) {
            callback(prototype);
            prototype = Object.getPrototypeOf(prototype);
        }
    }

    public traverseObjectOwnProperties(object: any, callback: (property: string) => void): void {
        if (!_.isObject(object)) {
            return;
        }
        Object.getOwnPropertyNames(object).forEach((name: string) => {
            callback(name);
        });
    }
}
