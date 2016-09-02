export class Captor<T> {
    private values:T[] = [];

    public getFirstCallValue():T {
        return this.values[0];
    }

    public getSecondCallValue():T {
        return this.values[1];
    }

    public getThirdCallValue():T {
        return this.values[2];
    }

    public getCallValueByIndex(index:number):T {
        return this.values[index];
    }

    public getLastCallValue():T {
        return this.values[this.values.length - 1];
    }

    public addValue(value:T):void {
        this.values.push(value);
    }
}