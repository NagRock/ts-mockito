import {Matcher} from "./Matcher";

export class StrictEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    match(value: any): boolean {
        return this.expectedValue === value;
    }

    toString(): string {
        if(this.expectedValue instanceof Array) {
            return `strictEqual([${this.expectedValue}])`;
        } else {
            return `strictEqual(${this.expectedValue})`;
        }
    }
}