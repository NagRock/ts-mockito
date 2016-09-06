import {MethodStubCollection} from './MethodStubCollection';
import {MethodToStub} from './MethodToStub';
import {Matcher} from './matcher/type/Matcher';
import {strictEqual} from './matcher/type/StrictEqualMatcher';
import {MethodAction} from './MethodAction';
import {ReturnValueMethodStub} from './stub/ReturnValueMethodStub';
import {MethodStub} from './stub/MethodStub';
import {RedundantMethodNameInCodeFinder} from './utils/RedundantMethodNameInCodeFinder';

export class Mock {
    private methodStubCollections: any = {};
    private methodActions: Array<MethodAction> = [];
    private mock: any = {};
    private instance: any = {};

    constructor(private clazz: any) {
        this.mock.__tsmockitoInstance = this.instance;
        this.createMethodStubsFromPrototypeKeys();
        this.createMethodStubsFromClassCode();
        this.createMethodStubsFromFunctionsCode();
        this.createInstanceActionListenersFromPrototypeKeys();
        this.createInstanceActionListenersFromClassCode();
        this.createInstanceActionListenersFromFunctionsCode();
    }

    public getMock(): any {
        return this.mock;
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

    private createMethodStubsFromPrototypeKeys(): void {
        for (let key in this.clazz.prototype) {
            this.createMethodStub(key);
        }
    }

    private createMethodStubsFromClassCode(): void {
        const subKeys = new RedundantMethodNameInCodeFinder().find(this.clazz.toString());
        for (let subKey in subKeys) {
            this.createMethodStub(subKey);
        }
    }

    private createMethodStubsFromFunctionsCode(): void {
        for (let key in this.clazz.prototype) {
            const subKeys = new RedundantMethodNameInCodeFinder().find(this.clazz.prototype[key].toString());
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

    private createInstanceActionListenersFromPrototypeKeys(): void {
        for (let key in this.clazz.prototype) {
            this.createInstanceActionListener(key);
        }
    }

    private createInstanceActionListenersFromClassCode(): void {
        const subKeys = new RedundantMethodNameInCodeFinder().find(this.clazz.toString());
        for (let subKey in subKeys) {
            this.createInstanceActionListener(subKey);
        }
    }

    private createInstanceActionListenersFromFunctionsCode(): void {
        for (let key in this.clazz.prototype) {
            const subKeys = new RedundantMethodNameInCodeFinder().find(this.clazz.prototype[key].toString());
            for (let subKey in subKeys) {
                this.createInstanceActionListener(subKey);
            }
        }
    }

    private createInstanceActionListener(key:string):void {
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