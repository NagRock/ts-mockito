import {Matcher} from "./Matcher";

export class MatchingStringMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: any): boolean {
        return value.match(this.expectedValue);
    }

    public toString(): string {
        return `match(${this.expectedValue})`;
    }
}
