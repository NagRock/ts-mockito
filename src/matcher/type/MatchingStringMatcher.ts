import {Matcher} from "./Matcher";

export class MatchingStringMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: any): boolean {
        return this.reverseResult(value.match(this.expectedValue));
    }

    public toString(): string {
        return `${this.prefix}match(${this.expectedValue})`;
    }
}
