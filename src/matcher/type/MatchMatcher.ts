import {Matcher} from "./Matcher";

export class MatchMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public isMatching(value: any): boolean {
        return value.match(this.expectedValue);
    }

    public toString(): string {
        return `match(${this.expectedValue})`;
    }
}
