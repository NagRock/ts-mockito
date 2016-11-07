import {Matcher} from "./Matcher";
import * as _ from "lodash";

export class AnyNumberMatcher extends Matcher {
    constructor() {
        super();
    }

    match(value: any): boolean {
        return _.isNumber(value);
    }

    toString(): string {
        return "anyNumber()";
    }
}