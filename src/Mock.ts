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
    private methodActions: Array<MethodAction> = [];
    private mock: any = {};
    private instance: any = {};
    private redundantMethodNameInCodeFinder = new RedundantMethodNameInCodeFinder();
    private subKeysInCodeFinder = new PrototypeKeyCodeGetter();

    constructor(private clazz: any) {
        this.mock.__tsmockitoInstance = this.instance;
        this.mock.__tsmockitoMocker = this;
        this.createMethodStubsFromPrototypeOwnPropertyNames();
        this.createMethodStubsFromPrototypeKeys();
        this.createMethodStubsFromClassCode();
        this.createMethodStubsFromFunctionsCode();
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

    private createMethodStubsFromPrototypeOwnPropertyNames(): void {
        try {
            let names = Object.getOwnPropertyNames(this.clazz.prototype);
            for (let i = 0; i < names.length; i++) {
                this.createMethodStub(names[i]);
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

    private createMethodStub(key) {
        if (this.mock[key]) {
            return;
        }

        this.mock[key] = (...args) => {
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

    private createInstanceActionListenersFromPrototypeOwnPropertyNames(): void {
        try {
            let names = Object.getOwnPropertyNames(this.clazz.prototype);
            for (let i = 0; i < names.length; i++) {
                this.createInstanceActionListener(names[i]);
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

    private createInstanceActionListener(key: string): void {
        if (this.instance[key]) {
            return;
        }

        this.instance[key] = (...args) => {
            let action: MethodAction = new MethodAction(key, args);
            this.methodActions.push(action);
            let methodStub = this.getMethodStub(key, args);
            methodStub.execute(args);
            return methodStub.getValue();
        };
    }

    private getMethodStub(key, args): MethodStub {
        let methodStub: MethodStubCollection = this.methodStubCollections[key];
        if (!methodStub) {
            return new ReturnValueMethodStub([], null);
        } else if (methodStub.getHadMoreThanOneBehavior() && methodStub.hasMatching(args)) {
            return methodStub.getFirstMatchingAndRemove(args);
        } else if (methodStub.hasMatching(args)) {
            return methodStub.getFirstMatching(args);
        } else {
            return new ReturnValueMethodStub([], null);
        }
    }
}