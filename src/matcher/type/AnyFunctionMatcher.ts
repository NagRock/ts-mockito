import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class AnyFunctionMatcher extends Matcher {
    constructor() {
        super();
    }

    public match(value: any): boolean {
        return this.reverseResult(_.isFunction(value));
    }

    public toString(): string {
        return `${this.prefix}anyFunction()`;
    }
}
