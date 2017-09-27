export class PrototypeKeyCodeGetter {
    public get(proto: any, key: string): string {
        const descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor) {
            if (!descriptor.get && !descriptor.set) {
                return proto[key].toString();
            }
            if (descriptor.get && descriptor.set) {
                return `${descriptor.get.toString()} ${descriptor.set.toString()}`;
            }
            if (descriptor.get && !descriptor.set) {
                return descriptor.get.toString();
            }
            if (!descriptor.get && descriptor.set) {
                return descriptor.set.toString();
            }
        } else {
            // key is defined in prototype but has no descriptor (it comes from abstract class and was not override)
            return "";
        }
    }
}
