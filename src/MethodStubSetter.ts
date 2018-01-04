import {MethodToStub} from "./MethodToStub";
import {CallFunctionMethodStub} from "./stub/CallFunctionMethodStub";
import {RejectPromiseMethodStub} from "./stub/RejectPromiseMethodStub";
import {ResolvePromiseMethodStub} from "./stub/ResolvePromiseMethodStub";
import {ReturnValueMethodStub} from "./stub/ReturnValueMethodStub";
import {ThrowErrorMethodStub} from "./stub/ThrowErrorMethodStub";

export class MethodStubSetter<T> {
    private static globalGroupIndex: number = 0;
    private groupIndex: number;

    constructor(private methodToStub: MethodToStub) {
        this.groupIndex = ++MethodStubSetter.globalGroupIndex;
    }

    public thenReturn(...rest: T[]): this {
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new ReturnValueMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    public thenThrow(...rest: Error[]): this {
        rest.forEach(error => {
            this.methodToStub.methodStubCollection.add(new ThrowErrorMethodStub(this.groupIndex, this.methodToStub.matchers, error));
        });
        return this;
    }

    public thenCall(func: (...args: any[]) => any): this {
        this.methodToStub.methodStubCollection.add(new CallFunctionMethodStub(this.groupIndex, this.methodToStub.matchers, func));
        return this;
    }

    public thenResolve(...rest: any[]): this {
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new ResolvePromiseMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    public thenReject(...rest: any[]): this {
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new RejectPromiseMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }
}
