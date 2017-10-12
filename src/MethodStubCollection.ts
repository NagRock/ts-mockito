import * as _ from "lodash";
import {MethodStub} from "./stub/MethodStub";

export class MethodStubCollection {
    private items: MethodStub[] = [];

    public add(item: MethodStub) {
        this.items.push(item);
    }

    public getLastMatchingGroupIndex(args): number {
        const matchingGroup = _.clone(this.items).reverse().find((item: MethodStub) => item.isApplicable(args));
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
        return this.items.find((item: MethodStub) => item.getGroupIndex() === groupIndex && item.isApplicable(args));
    }

    private getFirstMatchingIndexFromGroup(groupIndex: number, args: any[]): number {
        return this.items.findIndex((item: MethodStub) => item.getGroupIndex() === groupIndex && item.isApplicable(args));
    }

    private getItemsCountInGroup(groupIndex: number): number {
        return this.items.filter((item: MethodStub) => item.getGroupIndex() === groupIndex).length;
    }
}
