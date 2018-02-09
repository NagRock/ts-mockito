import {Matcher} from "./Matcher";

export class AnythingMatcher extends Matcher {
    constructor() {
        super();
    }

    public isMatching(value: any): boolean {
        return true;
    }

    public toString(): string {
        return "anything()";
    }
}
