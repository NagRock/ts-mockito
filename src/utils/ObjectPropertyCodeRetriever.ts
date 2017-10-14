export class ObjectPropertyCodeRetriever {
    public get(object: any, propertyName: string): string {
        const descriptor = Object.getOwnPropertyDescriptor(object, propertyName);
        if (!descriptor) {
            // property is defined in prototype but has no descriptor (it comes from abstract class and was not override)
            return "";
        }
        const accessorsCodes = [];
        if (descriptor.get) {
            accessorsCodes.push(descriptor.get.toString());
        }
        if (descriptor.set) {
            accessorsCodes.push(descriptor.set.toString());
        }
        return accessorsCodes.join(" ") || String(object[propertyName]);
    }
}
