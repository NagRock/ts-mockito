import {MethodToStub} from "./MethodToStub";
import {CallFunctionMethodStub} from "./stub/CallFunctionMethodStub";
import {RejectPromiseMethodStub} from "./stub/RejectPromiseMethodStub";
import {ResolvePromiseMethodStub} from "./stub/ResolvePromiseMethodStub";
import {ReturnValueMethodStub} from "./stub/ReturnValueMethodStub";
import {ThrowErrorMethodStub} from "./stub/ThrowErrorMethodStub";

export class MethodStubSetter<T, ResolveType = void, RejectType = Error> {
    private static globalGroupIndex: number = 0;
    private groupIndex: number;

    constructor(private methodToStub: MethodToStub) {
        this.groupIndex = ++MethodStubSetter.globalGroupIndex;
    }

    public thenReturn(...rest: T[]): this {
        this.convertToPropertyIfIsNotAFunction();
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new ReturnValueMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    public thenThrow(...rest: Error[]): this {
        this.convertToPropertyIfIsNotAFunction();
        rest.forEach(error => {
            this.methodToStub.methodStubCollection.add(new ThrowErrorMethodStub(this.groupIndex, this.methodToStub.matchers, error));
        });
        return this;
    }

    public thenCall(func: (...args: any[]) => any): this {
        this.convertToPropertyIfIsNotAFunction();
        this.methodToStub.methodStubCollection.add(new CallFunctionMethodStub(this.groupIndex, this.methodToStub.matchers, func));
        return this;
    }

    public thenResolve(...rest: ResolveType[]): this {
        this.convertToPropertyIfIsNotAFunction();
        // Resolves undefined if no resolve values are given.
        if (rest.length === 0) {
            rest.push(undefined);
        }
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new ResolvePromiseMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    public thenReject(...rest: Error[]): this {
        this.convertToPropertyIfIsNotAFunction();
        // Resolves undefined if no resolve values are given.
        if (rest.length === 0) {
            rest.push(new Error(`mocked '${this.methodToStub.name}' rejected`));
        }
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new RejectPromiseMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    private thenDoNothing(...rest: T[]): this {
        this.convertToPropertyIfIsNotAFunction();
        return this;
    }

    private convertToPropertyIfIsNotAFunction(): void {
        if (!this.methodToStub.methodStubCollection) {
            const info = (this.methodToStub as any)("__tsMockitoGetInfo");
            delete info.mocker.mock[info.key];
            delete info.mocker.instance[info.key];

            info.mocker.createPropertyStub(info.key);
            info.mocker.createInstancePropertyDescriptorListener(info.key, {}, undefined);
            info.mocker.createInstanceActionListener(info.key, undefined);
            this.methodToStub = info.mocker.mock[info.key];
        }
    }
}
