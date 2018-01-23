import * as _ from "lodash";

export class Matcher {
    public isNot: boolean = false;

    public match(...values: any[]): boolean {
        return this.reverseResult(false);
    }

    public toString(): string {
        return `${this.prefix}`;
    }

    public not() {
        const newMatcher = _.cloneDeep(this);
        newMatcher.isNot = true;
        return newMatcher;
    }

    protected get prefix(): string {
        return this.isNot ? "not()." : "";
    }

    protected reverseResult(result: boolean): boolean {
        return this.isNot ? !result : result;
    }
}
