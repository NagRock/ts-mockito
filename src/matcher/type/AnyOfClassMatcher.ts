import { Matcher } from './Matcher';

export class AnyOfClassMatcher<T> extends Matcher {

    constructor(private expectedClass: { new (...args: any[]): T  }) {
        super();
        if (expectedClass === null) {
            throw new Error('The expected class cannot be null.');
        }
    }

    match(value: any): boolean {
        return value instanceof this.expectedClass;
    }

    toString() {
        return `anyOfClass(${this.expectedClass['name']})`;
    }
}