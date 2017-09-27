export class Bar {
    constructor(public sampleValue: string = "asd") {

    }

    public differentConvertNumberToString(value: number): string {
        return value.toString();
    }

    public sumTwoNumbers(a: number, b: number): number {
        return a + b;
    }
}
