import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class ObjectContainingMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: Object): boolean {
        return _.isMatch(value, this.expectedValue);
    }

    public toString(): string {
        return `objectContaining(${this.expectedValue})`;
    }
}
