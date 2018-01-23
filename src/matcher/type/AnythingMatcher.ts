import {Matcher} from "./Matcher";

export class AnythingMatcher extends Matcher {
    constructor() {
        super();
    }

    public match(value: any): boolean {
        return this.reverseResult(true);
    }

    public toString(): string {
        return `${this.prefix}anything()`;
    }
}
