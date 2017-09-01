export class Foo {
    public dynamicMethod: Function;
    public dynamicMethodInFunction: Function;

    constructor() {
        this.dynamicMethod = function () {
            return 'dynamicMethod';
        }
    }

    public getBar(): string {
        this.dynamicMethodInFunction = function () {
            return 'dynamicMethodInFunction';
        };
        return 'bar';
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

    public sampleMethodWithOptionalArgument(a: number, b?:number): number {
        return a + b;
    }
}