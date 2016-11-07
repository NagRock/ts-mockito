import {Matcher} from "./Matcher";

export class AnythingMatcher extends Matcher {
    constructor() {
        super();
    }

    match(value: any): boolean {
        return true;
    }

    toString(): string {
        return "anything()";
    }
}