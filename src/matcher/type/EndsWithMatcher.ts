import { Matcher } from "./Matcher";

export class EndsWithMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: Object): boolean {
        return value && (typeof value === "string") && value.endsWith(this.expectedValue);
    }

    public toString(): string {
        return `endsWith(${this.expectedValue})`;
    }
}
