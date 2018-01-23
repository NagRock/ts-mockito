import * as _ from "lodash";
import {Matcher} from "./Matcher";

export class NotNullMatcher extends Matcher {
    public match(value: any): boolean {
        return this.reverseResult(!_.isNull(value));
    }

    public toString(): string {
        return `${this.prefix}notNull()`;
    }
}
