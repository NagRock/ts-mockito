import {Matcher} from "./Matcher";

export class StrictEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    match(value: any): boolean {
        return this.expectedValue === value;
    }

    toString(): string {
        return "strictEqual(" + this.expectedValue + ")";
    }
}