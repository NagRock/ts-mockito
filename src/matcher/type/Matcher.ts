export class Matcher {
    private isNot: boolean = false;

    public match(...values: any[]): boolean {
        return this.reverseResult(false);
    }

    public toString(): string {
        return `${this.prefix}`;
    }

    public reverse() {
        this.isNot = true;
        return this;
    }

    protected get prefix(): string {
        return this.isNot ? "not()." : "";
    }

    protected reverseResult(result: boolean): boolean {
        return this.isNot ? !result : result;
    }
}
