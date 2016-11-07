import {Matcher} from "./Matcher";
import * as _ from "lodash";

export class NotNullMatcher extends Matcher {
    match(value: any): boolean {
        return !_.isNull(value);
    }

    toString(): string {
        return "notNull()";
    }
}