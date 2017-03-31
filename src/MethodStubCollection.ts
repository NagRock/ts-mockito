import {MethodStub} from "./stub/MethodStub";

export class MethodStubCollection {
    private items: MethodStub[] = [];

    public add(item: MethodStub) {
        this.items.push(item);
    }

    public getLastMatchingGroupIndex(args): number {
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (item.isApplicable(args)) {
                return item.getGroupIndex();
            }
        }
        return -1;
    }

    public getFirstMatchingFromGroupAndRemoveIfNotLast(groupIndex: number, args: any[]): MethodStub {
        let index = this.getFirstMatchingIndexFromGroup(groupIndex, args);
        let result = this.getFirstMatchingFromGroup(groupIndex, args);
        if (index > -1 && this.getItemsCountInGroup(groupIndex) > 1) {
            this.items.splice(index, 1);
        }
        return result;
    }

    private getFirstMatchingFromGroup(groupIndex: number, args: any[]): MethodStub {
        for (let item of this.items) {
            if (item.getGroupIndex() === groupIndex && item.isApplicable(args)) {
                return item;
            }
        }
        return null;
    }

    public hasMatchingInAnyGroup(args: any[]): boolean {
        for (let item of this.items) {
            if (item.isApplicable(args)) {
                return true;
            }
        }
        return false;
    }

    private getFirstMatchingIndexFromGroup(groupIndex: number, args: any[]): number {
        let index = 0;
        for (let item of this.items) {
            if (item.getGroupIndex() === groupIndex && item.isApplicable(args)) {
                return index;
            }
            index++;
        }
        return -1;
    }

    private getItemsCountInGroup(groupIndex: number): number {
        let result = 0;
        for (let item of this.items) {
            if (item.getGroupIndex() === groupIndex) {
                result++;
            }
        }
        return result;
    }
}