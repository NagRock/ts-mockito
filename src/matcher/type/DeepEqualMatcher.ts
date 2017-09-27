import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class DeepEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: any): boolean {
        return _.isEqualWith(this.expectedValue, value,
            (expected: any, actual: any): boolean => {
                if (expected instanceof Matcher) {
                    return expected.match(actual);
                }

                return undefined;
            });
    }

    public toString(): string {
        if (this.expectedValue instanceof Array) {
            return `deepEqual([${this.expectedValue}])`;
        } else {
            return `deepEqual(${this.expectedValue})`;
        }
    }
}
