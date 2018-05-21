export class Foo {
    public dynamicMethod: Function;
    public dynamicMethodInFunction: Function;

    constructor() {
        this.dynamicMethod = () => "dynamicMethod";
    }

    public getBar(): string {
        this.dynamicMethodInFunction = () => "dynamicMethodInFunction";
        return "bar";
    }

    public concatStringWithNumber(sampleString: string, sampleNumber: number): string {
        return sampleString + sampleNumber;
    }

    public convertNumberToString(value: number): string {
        return value.toString();
    }

    public getStringById(value: number): string {
        return value.toString();
    }

    public sumTwoNumbers(a: number, b: number): number {
        return a + b;
    }

    public sampleMethodWithOptionalArgument(a: number, b?: number): number {
        return a + b;
    }

    public sampleMethodWithTwoOptionalArguments(a?: number, b?: number): number {
        return a + b;
    }

    public sampleMethodReturningPromise(value: string): Promise<string> {
        return Promise.resolve(value);
    }

    public sampleMethodReturningVoidPromise(value: string): Promise<void> {
        return Promise.resolve();
    }

    public sampleMethodReturningObjectPromise(value: string): Promise<Foo> {
        return Promise.resolve(this);
    }
}
