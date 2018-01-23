import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class AnyNumberMatcher extends Matcher {
    constructor() {
        super();
    }

    public match(value: any): boolean {
        return this.reverseResult(_.isNumber(value));
    }

    public toString(): string {
        return `${this.prefix}anyNumber()`;
    }
}
