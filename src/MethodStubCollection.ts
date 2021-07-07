import * as _ from "lodash";
import {MethodStub} from "./stub/MethodStub";

export class MethodStubCollection {
    private items: MethodStub[] = [];

    public add(item: MethodStub) {
        this.items.push(item);
    }

    public getLastMatchingGroupIndex(args): number {
        const matchingGroup = _.clone(this.items).reverse().filter((item: MethodStub) => item.isApplicable(args))[0];
        return matchingGroup ? matchingGroup.getGroupIndex() : -1;
    }

    public getFirstMatchingFromGroupAndRemoveIfNotLast(groupIndex: number, args: any[]): MethodStub {
        const result = this.getFirstMatchingFromGroup(groupIndex, args);
        this.removeIfNotLast(groupIndex, args);
        return result;
    }

    public hasMatchingInAnyGroup(args: any[]): boolean {
        return this.items.some((item: MethodStub) => item.isApplicable(args));
    }

    private removeIfNotLast(groupIndex: number, args: any[]): void {
        const index = this.getFirstMatchingIndexFromGroup(groupIndex, args);
        if (index > -1 && this.getItemsCountInGroup(groupIndex) > 1) {
            this.items.splice(index, 1);
        }
    }

    private getFirstMatchingFromGroup(groupIndex: number, args: any[]): MethodStub {
        return this.items.filter((item: MethodStub) => item.getGroupIndex() === groupIndex && item.isApplicable(args))[0];
    }

    private getFirstMatchingIndexFromGroup(groupIndex: number, args: any[]): number {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.getGroupIndex() === groupIndex && item.isApplicable(args)) {
                return i;
            }
        }
        return -1;
    }

    private getItemsCountInGroup(groupIndex: number): number {
        return this.items.filter((item: MethodStub) => item.getGroupIndex() === groupIndex).length;
    }
}
