import {Matcher} from "./Matcher";
import * as _ from "lodash";

export class DeepEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    match(value: any): boolean {
        return _.isEqual(this.expectedValue, value);
    }

    toString(): string {
        if(this.expectedValue instanceof Array) {
            return `deepEqual([${this.expectedValue}])`;
        } else {
            return `deepEqual(${this.expectedValue})`;
        }
    }
}