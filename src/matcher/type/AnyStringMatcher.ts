import {Matcher} from "./Matcher";
import * as _ from "lodash";

export class AnyStringMatcher extends Matcher {
    constructor() {
        super();
    }

    match(value: any): boolean {
        return _.isString(value);
    }

    toString(): string {
        return "anyString()";
    }
}