import {MethodToStub} from './MethodToStub';
import {ReturnValueMethodStub} from './stub/ReturnValueMethodStub';
import {ThrowErrorMethodStub} from './stub/ThrowErrorMethodStub';
import {CallFunctionMethodStub} from './stub/CallFunctionMethodStub';

export class MethodStubSetter<T> {
    constructor(private methodToStub: MethodToStub) {

    }

    public thenReturn(value: T): void {
        this.methodToStub.methodStubCollection.add(new ReturnValueMethodStub(this.methodToStub.matchers, value));
    }

    public throwsError(error: Error): void {
        this.methodToStub.methodStubCollection.add(new ThrowErrorMethodStub(this.methodToStub.matchers, error));
    }

    public thenCall(func: (...args:any[]) => any): void {
        this.methodToStub.methodStubCollection.add(new CallFunctionMethodStub(this.methodToStub.matchers, func));
    }
}