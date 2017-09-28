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
    private redundantMethodNameInCodeFinder = new RedundantMethodNameInCodeFinder();
    private subKeysInCodeFinder = new PrototypeKeyCodeGetter();

    constructor(private clazz: any, protected instance: any = {}) {
        this.mock.__tsmockitoInstance = this.instance;
        this.mock.__tsmockitoMocker = this;
        this.createMethodStubsFromOwnProperties();
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
        const result: MethodAction[] = [];

        this.methodActions.forEach((item: MethodAction) => {
            if (item.isApplicable(methodName, matchers)) {
                result.push(item);
            }
        });
        return result;
    }

    public getFirstMatchingAction(methodName: string, matchers: Array<Matcher>): MethodAction {
        return this.getAllMatchingActions(methodName, matchers)[0];
    }

    public getActionsByName(name: string): MethodAction[] {
        return this.methodActions.filter(action => action.methodName === name);
    }

    protected createMethodStubsFromOwnProperties(prototype: any = this.clazz.prototype,
                                                 recurse: boolean = true): void {
        if (prototype === Object.prototype) {
            return;
        }

        try {
            const names = Object.getOwnPropertyNames(prototype);
            names.forEach((name: string) => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, name);

                if (!descriptor) {
                    return;
                }

                if (descriptor.get) {
                    this.createPropertyStub(name);
                } else {
                    this.createMethodStub(name);
                }
            });

            prototype = prototype.__proto__;
            this.createMethodStubsFromOwnProperties(prototype);
        } catch (error) {
            // es5 can throw an error when getOwnPropertyNames is called on primitives
        }
    }

    protected createInstanceActionListenersFromOwnPropertyDescriptors(prototype: any = this.clazz.prototype,
                                                                      recurse: boolean = true): void {
        try {
            const names = Object.getOwnPropertyNames(prototype);
            names.forEach((name: string) => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
                if (descriptor && descriptor.get) {
                    this.createInstancePropertyDescriptorListener(name, descriptor, prototype);
                }
            });

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

    protected createInstancePropertyDescriptorListener(key: string,
                                                       descriptor: PropertyDescriptor,
                                                       prototype: any): void {
        if (this.instance.hasOwnProperty(key)) {
            return;
        }

        Object.defineProperty(this.instance, key, {
            get: this.createActionListener(key),
        });
    }

    protected createInstanceActionListenersFromOwnPropertyNames(prototype: any = this.clazz.prototype,
                                                                recurse: boolean = true): void {
        try {
            const names = Object.getOwnPropertyNames(prototype);
            names.forEach((name: string) => {
                this.createInstanceActionListener(name, prototype);
            });

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

    protected createInstanceActionListener(key: string, prototype: any): void {
        if (this.instance.hasOwnProperty(key)) {
            return;
        }

        this.instance[key] = this.createActionListener(key);
    }

    protected createActionListener(key: string): () => any {
        return (...args) => {
            const action: MethodAction = new MethodAction(key, args);
            this.methodActions.push(action);
            const methodStub = this.getMethodStub(key, args);
            methodStub.execute(args);
            return methodStub.getValue();
        };
    }

    protected getEmptyMethodStub(key: string, args: any[]): MethodStub {
        return new ReturnValueMethodStub(-1, [], null);
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

            const matchers: Matcher[] = [];

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

    private createInstanceActionListenersFromPrototypeKeys(): void {
        Object.keys(this.clazz.prototype).forEach((key: string) => {
            this.createInstanceActionListener(key, this.clazz.prototype);
        });
    }

    private createInstanceActionListenersFromClassCode(): void {
        const subKeys = this.redundantMethodNameInCodeFinder.find(this.clazz.toString());
        Object.keys(subKeys).forEach((subKey: string) => {
            this.createInstanceActionListener(subKey, this.clazz.prototype);
        });
    }

    private createInstanceActionListenersFromFunctionsCode(): void {
        Object.keys(this.clazz.prototype).forEach((key: string) => {
            const subKeys = this.redundantMethodNameInCodeFinder.find(this.subKeysInCodeFinder.get(this.clazz.prototype, key));
            Object.keys(subKeys).forEach((subKey: string) => {
                this.createInstanceActionListener(subKey, this.clazz.prototype);
            });
        });
    }

    private getMethodStub(key: string, args: any[]): MethodStub {
        const methodStub: MethodStubCollection = this.methodStubCollections[key];
        if (methodStub && methodStub.hasMatchingInAnyGroup(args)) {
            const groupIndex = methodStub.getLastMatchingGroupIndex(args);
            return methodStub.getFirstMatchingFromGroupAndRemoveIfNotLast(groupIndex, args);
        } else {
            return this.getEmptyMethodStub(key, args);
        }
    }
}
