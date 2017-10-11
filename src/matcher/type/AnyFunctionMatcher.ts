import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class AnyFunctionMatcher extends Matcher {
    constructor() {
        super();
    }

    public match(value: any): boolean {
        return _.isFunction(value);
    }

    public toString(): string {
        return "anyFunction()";
    }
}
