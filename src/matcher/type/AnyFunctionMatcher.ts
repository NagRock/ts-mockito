import { Matcher } from "./Matcher";
import * as _ from "lodash";

export class AnyFunctionMatcher extends Matcher {

    constructor() {
        super();
    }

    match(value: any): boolean {
        return _.isFunction(value);
    }

    toString(): string {
        return "anyFunction()";
    }
}