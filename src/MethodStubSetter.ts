import {MethodToStub} from './MethodToStub';
import {MethodStub} from './MethodStub';

export class MethodStubSetter<T> {
    constructor(private methodToStub: MethodToStub) {

    }

    public thenReturn(value: T): void {
        this.methodToStub.methodStubCollection.add(new MethodStub(this.methodToStub.matchers, value));
    }

    public throwsError(value: Error): void {
        this.methodToStub.methodStubCollection.add(new MethodStub(this.methodToStub.matchers, {error: value}));
    }
}