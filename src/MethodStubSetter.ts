import {MethodToStub} from "./MethodToStub";
import {ReturnValueMethodStub} from "./stub/ReturnValueMethodStub";
import {ThrowErrorMethodStub} from "./stub/ThrowErrorMethodStub";
import {CallFunctionMethodStub} from "./stub/CallFunctionMethodStub";

export class MethodStubSetter<T> {
    private static globalGroupIndex: number = 0;
    private groupIndex: number;

    constructor(private methodToStub: MethodToStub) {
        this.groupIndex = ++MethodStubSetter.globalGroupIndex;
    }

    public thenReturn(...rest: T[]): this {
        for (let value of rest) {
            this.methodToStub.methodStubCollection.add(new ReturnValueMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        }
        return this;
    }

    public throwsError(...rest: Error[]): this {
        for (let error of rest) {
            this.methodToStub.methodStubCollection.add(new ThrowErrorMethodStub(this.groupIndex, this.methodToStub.matchers, error));
        }
        return this;
    }

    public thenCall(func: (...args: any[]) => any): this {
        this.methodToStub.methodStubCollection.add(new CallFunctionMethodStub(this.groupIndex, this.methodToStub.matchers, func));
        return this;
    }
}