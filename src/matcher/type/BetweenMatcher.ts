import {Matcher} from "./Matcher";

export class BetweenMatcher extends Matcher {
    constructor(private min: number, private max: number) {
        super();

        if (min > max) {
            throw new Error("between matcher error: min value can\'t be greater than max");
        }
    }

    public match(value: any): boolean {
        return value >= this.min && value <= this.max;
    }

    public toString(): string {
        return `between(${this.min}, ${this.max})`;
    }
}
