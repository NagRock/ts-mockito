import {Matcher} from "./matcher/type/Matcher";
import {MethodAction} from "./MethodAction";
import {MethodStubCollection} from "./MethodStubCollection";
import {MethodToStub} from "./MethodToStub";
import {MethodStub} from "./stub/MethodStub";
import {ReturnValueMethodStub} from "./stub/ReturnValueMethodStub";
import {strictEqual} from "./ts-mockito";
import {PrototypeKeyCodeGetter} from "./utils/PrototypeKeyCodeGetter";
import {RedundantMethodNameInCodeFinder} from "./utils/RedundantMethodNameInCodeFinder";

export class Mocker {
    private methodStubCollections: any = {};
    private methodActions: MethodAction[] = [];
    private mock: any = {};
    private instance: any = {};
    private redundantMethodNameInCodeFinder = new RedundantMethodNameInCodeFinder();
    private subKeysInCodeFinder = new PrototypeKeyCodeGetter();

    constructor(private clazz: any) {
        this.mock.__tsmockitoInstance = this.instance;
        this.mock.__tsmockitoMocker = this;
        this.createMethodStubsFromPrototypeOwnPropertyDescriptors();
        this.createMethodStubsFromPrototypeOwnPropertyNames();
        this.createMethodStubsFromPrototypeKeys();
        this.createMethodStubsFromClassCode();
        this.createMethodStubsFromFunctionsCode();
        this.createInstanceActionListenersFromPrototypeOwnPropertyDescriptors();
        this.createInstanceActionListenersFromPrototypeOwnPropertyNames();
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
        const result: Array<MethodAction> = [];

        for (const item of this.methodActions) {
            if (item.isApplicable(methodName, matchers)) {
                result.push(item);
            }
        }
        return result;
    }

    public getFirstMatchingAction(methodName: string, matchers: Array<Matcher>): MethodAction {
        return this.getAllMatchingActions(methodName, matchers)[0];
    }

    public getActionsByName(name: string): MethodAction[] {
        return this.methodActions.filter(action => action.methodName === name);
    }

    private createMethodStubsFromPrototypeOwnPropertyDescriptors(prototype: any = this.clazz.prototype): void {
        try {
            const names = Object.getOwnPropertyNames(prototype);
            names.forEach((name: string) => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
                if (descriptor && descriptor.get) {
                    this.createPropertyStub(name);
                }
            });

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
            const names = Object.getOwnPropertyNames(prototype);
            names.forEach((name: string) => {
                this.createMethodStub(name);
            });

            prototype = prototype.__proto__;
            if (prototype && prototype !== Object.prototype) {
                this.createMethodStubsFromPrototypeOwnPropertyNames(prototype);
            }
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    private createMethodStubsFromPrototypeKeys(): void {
        Object.keys(this.clazz.prototype).forEach((key: string) => {
            this.createMethodStub(key);
        });
    }

    private createMethodStubsFromClassCode(): void {
        const subKeys = this.redundantMethodNameInCodeFinder.find(this.clazz.toString());
        Object.keys(subKeys).forEach((subKey: string) => {
            this.createMethodStub(subKey);
        });
    }

    private createMethodStubsFromFunctionsCode(): void {
        Object.keys(this.clazz.prototype).forEach((key: string) => {
            const subKeys = this.redundantMethodNameInCodeFinder.find(this.subKeysInCodeFinder.get(this.clazz.prototype, key));
            Object.keys(subKeys).forEach((subKey: string) => {
                this.createMethodStub(subKey);
            });
        });
    }

    private createPropertyStub(key: string): void {
        if (this.mock.hasOwnProperty(key)) {
            return;
        }

        Object.defineProperty(this.mock, key, {
            get: this.createMethodToStub(key),
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

            const matchers: Array<Matcher> = [];

            for (const arg of args) {
                if (!(arg instanceof Matcher)) {
                    matchers.push(strictEqual(arg));
                } else {
                    matchers.push(arg);
                }
            }

            return new MethodToStub(this.methodStubCollections[key], matchers, this, key);
        };
    }

    private createInstanceActionListenersFromPrototypeOwnPropertyDescriptors(prototype: any = this.clazz.prototype): void {
        try {
            const names = Object.getOwnPropertyNames(prototype);
            names.forEach((name: string) => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
                if (descriptor && descriptor.get) {
                    this.createInstancePropertyDescriptorListener(name);
                }
            });

            prototype = prototype.__proto__;
            if (prototype && prototype !== Object.prototype) {
                this.createInstanceActionListenersFromPrototypeOwnPropertyDescriptors(prototype);
            }
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    private createInstancePropertyDescriptorListener(key: string): void {
        if (this.instance.hasOwnProperty(key)) {
            return;
        }

        Object.defineProperty(this.instance, key, {
            get: this.createActionListener(key),
        });
    }

    private createInstanceActionListenersFromPrototypeOwnPropertyNames(prototype: any = this.clazz.prototype): void {
        try {
            const names = Object.getOwnPropertyNames(prototype);
            names.forEach((name: string) => {
                this.createInstanceActionListener(name);
            });

            prototype = prototype.__proto__;
            if (prototype && prototype !== Object.prototype) {
                this.createInstanceActionListenersFromPrototypeOwnPropertyNames(prototype);
            }
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    private createInstanceActionListenersFromPrototypeKeys(): void {
        Object.keys(this.clazz.prototype).forEach((key: string) => {
            this.createInstanceActionListener(key);
        });
    }

    private createInstanceActionListenersFromClassCode(): void {
        const subKeys = this.redundantMethodNameInCodeFinder.find(this.clazz.toString());
        Object.keys(subKeys).forEach((subKey: string) => {
            this.createInstanceActionListener(subKey);
        });
    }

    private createInstanceActionListenersFromFunctionsCode(): void {
        Object.keys(this.clazz.prototype).forEach((key: string) => {
            const subKeys = this.redundantMethodNameInCodeFinder.find(this.subKeysInCodeFinder.get(this.clazz.prototype, key));
            Object.keys(subKeys).forEach((subKey: string) => {
                this.createInstanceActionListener(subKey);
            });
        });
    }

    private createInstanceActionListener(key: string): void {
        if (this.instance.hasOwnProperty(key)) {
            return;
        }

        this.instance[key] = this.createActionListener(key);
    }

    private createActionListener(key: string): () => any {
        return (...args) => {
            const action: MethodAction = new MethodAction(key, args);
            this.methodActions.push(action);
            const methodStub = this.getMethodStub(key, args);
            methodStub.execute(args);
            return methodStub.getValue();
        };
    }

    private getMethodStub(key, args): MethodStub {
        const methodStub: MethodStubCollection = this.methodStubCollections[key];
        if (!methodStub) {
            return new ReturnValueMethodStub(-1, [], null);
        } else if (methodStub.hasMatchingInAnyGroup(args)) {
            const groupIndex = methodStub.getLastMatchingGroupIndex(args);
            return methodStub.getFirstMatchingFromGroupAndRemoveIfNotLast(groupIndex, args);
        } else {
            return new ReturnValueMethodStub(-1, [], null);
        }
    }
}
