import {Matcher} from "./Matcher";

export class AnyOfClassMatcher<T> extends Matcher {
    constructor(private expectedClass: { new (...args: any[]): T }) {
        super();
        if (expectedClass === null) {
            throw new Error("The expected class cannot be null.");
        }
    }

    public match(value: any): boolean {
        return value instanceof this.expectedClass;
    }

    public toString() {
        return `anyOfClass(${this.expectedClass["name"]})`;
    }
}
