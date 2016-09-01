import {MethodStub} from './MethodStub';

export class MethodStubCollection {
    private hadMoreThanOneBehavior: boolean = false;
    private items: Array<MethodStub> = [];

    public add(item: MethodStub) {
        this.items.push(item);

        if(this.items.length > 1) {
            this.hadMoreThanOneBehavior = true;
        }
    }

    public getFirstMatchingAndRemove(args): MethodStub {
        let index = this.getFirstMatchingIndex(args);
        let result = this.getFirstMatching(args);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        return result;
    }

    public getFirstMatching(args): MethodStub {
        for (let item of this.items) {
            if (item.isApplicable(args)) {
                return item;
            }
        }
        return null;
    }

    public getHadMoreThanOneBehavior(): boolean {
        return this.hadMoreThanOneBehavior;
    }

    public hasMatching(args): boolean {
        return this.getFirstMatchingIndex(args) > -1;
    }

    private getFirstMatchingIndex(args): number {
        let index = 0;
        for (let item of this.items) {
            if (item.isApplicable(args)) {
                return index;
            }
            index++;
        }
        return -1;
    }
}