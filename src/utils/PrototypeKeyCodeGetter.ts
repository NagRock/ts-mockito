export class PrototypeKeyCodeGetter {
    get(proto: any, key: string): string {
        const descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (!descriptor.get && !descriptor.set) {
            return proto[key].toString();
        }
        if (descriptor.get && descriptor.set) {
            return descriptor.get.toString() + " " + descriptor.set.toString();
        }
        if (descriptor.get && !descriptor.set) {
            return descriptor.get.toString();
        }
        if (!descriptor.get && descriptor.set) {
            return descriptor.set.toString();
        }
    }
}