import { Matcher } from "./Matcher";

export class StartsWithMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: Object): boolean {
        return value && (typeof value === "string") && value.startsWith(this.expectedValue);
    }

    public toString(): string {
        return `startsWith(${this.expectedValue})`;
    }
}
