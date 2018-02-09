import {Matcher} from "./Matcher";

export class StrictEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public isMatching(value: any): boolean {
        return this.expectedValue === value;
    }

    public toString(): string {
        if (this.expectedValue instanceof Array) {
            return `strictEqual([${this.expectedValue}])`;
        } else {
            return `strictEqual(${this.expectedValue})`;
        }
    }
}
