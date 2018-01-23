import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class AnyStringMatcher extends Matcher {
    constructor() {
        super();
    }

    public match(value: any): boolean {
        return this.reverseResult(_.isString(value));
    }

    public toString(): string {
        return `${this.prefix}anyString()`;
    }
}
