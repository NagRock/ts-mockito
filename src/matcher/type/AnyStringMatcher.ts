import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class AnyStringMatcher extends Matcher {
    constructor() {
        super();
    }

    public match(value: any): boolean {
        return _.isString(value);
    }

    public toString(): string {
        return "anyString()";
    }
}
