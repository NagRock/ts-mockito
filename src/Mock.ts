import {MethodStubCollection} from "./MethodStubCollection";
import {MethodToStub} from "./MethodToStub";
import {Matcher} from "./matcher/type/Matcher";
import {MethodAction} from "./MethodAction";
import {ReturnValueMethodStub} from "./stub/ReturnValueMethodStub";
import {MethodStub} from "./stub/MethodStub";
import {RedundantMethodNameInCodeFinder} from "./utils/RedundantMethodNameInCodeFinder";
import {strictEqual} from "./ts-mockito";
import {PrototypeKeyCodeGetter} from "./utils/PrototypeKeyCodeGetter";

export class Mocker {
    private methodStubCollections: any = {};
    private methodActions: MethodAction[] = [];
    private mock: any = {};
    private redundantMethodNameInCodeFinder = new RedundantMethodNameInCodeFinder();
    private subKeysInCodeFinder = new PrototypeKeyCodeGetter();

    constructor(private clazz: any, protected instance: any = {}) {
        this.mock.__tsmockitoInstance = this.instance;
        this.mock.__tsmockitoMocker = this;
        this.createMethodStubsFromPrototypeOwnPropertyDescriptors();
        this.createMethodStubsFromPrototypeOwnPropertyNames();
        this.createMethodStubsFromPrototypeKeys();
        this.createMethodStubsFromClassCode();
        this.createMethodStubsFromFunctionsCode();
        this.createInstanceActionListenersFromOwnPropertyDescriptors();
        this.createInstanceActionListenersFromOwnPropertyNames();
        this.createInstanceActionListenersFromPrototypeKeys();
        this.createInstanceActionListenersFromClassCode();
        this.createInstanceActionListenersFromFunctionsCode();
    }

    public getMock(): any {
        return this.mock;
    }

    public reset(): void {
        this.methodStubCollections = {};
        this.methodActions = [];
    }

    public resetCalls(): void {
        this.methodActions = [];
    }

    public getAllMatchingActions(methodName: string, matchers: Array<Matcher>): Array<MethodAction> {
        let result: Array<MethodAction> = [];

        for (let item of this.methodActions) {
            if (item.isApplicable(methodName, matchers)) {
                result.push(item);
            }
        }
        return result;
    }

    public getFirstMatchingAction(methodName: string, matchers: Array<Matcher>): MethodAction {
        return this.getAllMatchingActions(methodName, matchers)[0];
    }

    private createMethodStubsFromPrototypeOwnPropertyDescriptors(prototype: any = this.clazz.prototype): void {
        try {
            let names = Object.getOwnPropertyNames(prototype);
            for (let i = 0; i < names.length; i++) {
                let key = names[i];
                let descriptor = Object.getOwnPropertyDescriptor(prototype, key);
                if (descriptor && descriptor.get) {
                    this.createPropertyStub(key);
                }
            }

            prototype = prototype.__proto__;
            if (prototype && prototype !== Object.prototype) {
                this.createMethodStubsFromPrototypeOwnPropertyDescriptors(prototype);
            }
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    private createMethodStubsFromPrototypeOwnPropertyNames(prototype: any = this.clazz.prototype): void {
        try {
            let names = Object.getOwnPropertyNames(prototype);
            for (let i = 0; i < names.length; i++) {
                this.createMethodStub(names[i]);
            }

            prototype = prototype.__proto__;
            if (prototype && prototype !== Object.prototype) {
                this.createMethodStubsFromPrototypeOwnPropertyNames(prototype);
            }
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    private createMethodStubsFromPrototypeKeys(): void {
        for (let key in this.clazz.prototype) {
            this.createMethodStub(key);
        }
    }

    private createMethodStubsFromClassCode(): void {
        const subKeys = this.redundantMethodNameInCodeFinder.find(this.clazz.toString());
        for (let subKey in subKeys) {
            this.createMethodStub(subKey);
        }
    }

    private createMethodStubsFromFunctionsCode(): void {
        for (let key in this.clazz.prototype) {
            const subKeys = this.redundantMethodNameInCodeFinder.find(this.subKeysInCodeFinder.get(this.clazz.prototype, key));
            for (let subKey in subKeys) {
                this.createMethodStub(subKey);
            }
        }
    }

    private createPropertyStub(key: string): void {
        if (this.mock.hasOwnProperty(key)) {
            return;
        }

        Object.defineProperty(this.mock, key, {
            get: this.createMethodToStub(key)
        });
    }

    private createMethodStub(key) {
        if (this.mock.hasOwnProperty(key)) {
            return;
        }

        this.mock[key] = this.createMethodToStub(key);
    }

    private createMethodToStub(key: string): () => any {
        return (...args) => {
            if (!this.methodStubCollections[key]) {
                this.methodStubCollections[key] = new MethodStubCollection();
            }

            let matchers: Array<Matcher> = [];

            for (let arg of args) {
                if (!(arg instanceof Matcher)) {
                    matchers.push(strictEqual(arg));
                } else {
                    matchers.push(arg);
                }
            }

            return new MethodToStub(this.methodStubCollections[key], matchers, this, key);
        };
    }

    protected createInstanceActionListenersFromOwnPropertyDescriptors(prototype: any = this.clazz.prototype,
                                                                    recurse: boolean = true): void {
        try {
            let names = Object.getOwnPropertyNames(prototype);
            for (let i = 0; i < names.length; i++) {
                let key = names[i];
                let descriptor = Object.getOwnPropertyDescriptor(prototype, key);
                if (descriptor && descriptor.get) {
                    this.createInstancePropertyDescriptorListener(key, descriptor);
                }
            }

            if (!recurse) {
                return;
            }

            prototype = prototype.__proto__;
            if (prototype && prototype !== Object.prototype) {
                this.createInstanceActionListenersFromOwnPropertyDescriptors(prototype);
            }
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    protected createInstancePropertyDescriptorListener(key: string, descriptor?: PropertyDescriptor): void {
        if (this.instance.hasOwnProperty(key)) {
            return;
        }

        Object.defineProperty(this.instance, key, {
            get: this.createActionListener(key)
        });
    }

    protected createInstanceActionListenersFromOwnPropertyNames(prototype: any = this.clazz.prototype,
                                                              recurse: boolean = true): void {
        try {
            let names = Object.getOwnPropertyNames(prototype);
            for (let i = 0; i < names.length; i++) {
                this.createInstanceActionListener(names[i]);
            }

            if (!recurse) {
                return;
            }

            prototype = prototype.__proto__;
            if (prototype && prototype !== Object.prototype) {
                this.createInstanceActionListenersFromOwnPropertyNames(prototype);
            }
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    private createInstanceActionListenersFromPrototypeKeys(): void {
        for (let key in this.clazz.prototype) {
            this.createInstanceActionListener(key);
        }
    }

    private createInstanceActionListenersFromClassCode(): void {
        const subKeys = this.redundantMethodNameInCodeFinder.find(this.clazz.toString());
        for (let subKey in subKeys) {
            this.createInstanceActionListener(subKey);
        }
    }

    private createInstanceActionListenersFromFunctionsCode(): void {
        for (let key in this.clazz.prototype) {
            const subKeys = this.redundantMethodNameInCodeFinder.find(this.subKeysInCodeFinder.get(this.clazz.prototype, key));
            for (let subKey in subKeys) {
                this.createInstanceActionListener(subKey);
            }
        }
    }

    protected createInstanceActionListener(key: string): void {
        if (this.instance.hasOwnProperty(key)) {
            return;
        }

        this.instance[key] = this.createActionListener(key);
    }

    protected createActionListener(key: string): () => any {
        return (...args) => {
            let action: MethodAction = new MethodAction(key, args);
            this.methodActions.push(action);
            let methodStub = this.getMethodStub(key, args);
            methodStub.execute(args);
            return methodStub.getValue();
        };
    }

    private getMethodStub(key: string, args: any[]): MethodStub {
        let methodStub: MethodStubCollection = this.methodStubCollections[key];
        if (!methodStub) {
            return this.getEmptyMethodStub(key, args);
        } else if (methodStub.hasMatchingInAnyGroup(args)) {
            const groupIndex = methodStub.getLastMatchingGroupIndex(args);
            return methodStub.getFirstMatchingFromGroupAndRemoveIfNotLast(groupIndex, args);
        } else {
            return new ReturnValueMethodStub(-1, [], null);
        }
    }

    protected getEmptyMethodStub(key: string, args: any[]): MethodStub {
        return new ReturnValueMethodStub(-1, [], null);
    }

    getActionsByName(name: string): MethodAction[] {
        return this.methodActions.filter(action => action.methodName === name);
    }
}
