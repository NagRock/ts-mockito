import {Matcher} from "./Matcher";

export class StrictEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: any): boolean {
        return this.reverseResult(this.expectedValue === value);
    }

    public toString(): string {
        if (this.expectedValue instanceof Array) {
            return `${this.prefix}strictEqual([${this.expectedValue}])`;
        } else {
            return `${this.prefix}strictEqual(${this.expectedValue})`;
        }
    }
}
