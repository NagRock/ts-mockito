import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class AnyFunctionMatcher extends Matcher {
    constructor() {
        super();
    }

    public isMatching(value: any): boolean {
        return _.isFunction(value);
    }

    public toString(): string {
        return "anyFunction()";
    }
}
