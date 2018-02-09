import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class NotNullMatcher extends Matcher {
    public isMatching(value: any): boolean {
        return !_.isNull(value);
    }

    public toString(): string {
        return "notNull()";
    }
}
