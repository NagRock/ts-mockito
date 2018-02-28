import * as _ from "lodash";
import {Matcher} from "./matcher/type/Matcher";
import {MethodAction} from "./MethodAction";
import {MethodStubCollection} from "./MethodStubCollection";
import {MethodToStub} from "./MethodToStub";
import {MethodStub} from "./stub/MethodStub";
import {ReturnValueMethodStub} from "./stub/ReturnValueMethodStub";
import {strictEqual} from "./ts-mockito";
import {MockableFunctionsFinder} from "./utils/MockableFunctionsFinder";
import {ObjectInspector} from "./utils/ObjectInspector";
import {ObjectPropertyCodeRetriever} from "./utils/ObjectPropertyCodeRetriever";

export class Mocker {
    protected objectInspector = new ObjectInspector();
    private methodStubCollections: any = {};
    private methodActions: MethodAction[] = [];
    private mock: any = {};
    private mockableFunctionsFinder = new MockableFunctionsFinder();
    private objectPropertyCodeRetriever = new ObjectPropertyCodeRetriever();

    constructor(private clazz: any, protected instance: any = {}) {
        this.mock.__tsmockitoInstance = this.instance;
        this.mock.__tsmockitoMocker = this;
        if (_.isObject(this.clazz) && _.isObject(this.instance)) {
            this.processProperties(this.clazz.prototype);
            this.processClassCode(this.clazz);
            this.processFunctionsCode(this.clazz.prototype);
        }
        if (typeof Proxy !== "undefined") {
            this.mock.__tsmockitoInstance = new Proxy(this.instance, this.createCatchAllHandlerForRemainingPropertiesWithoutGetters());
        }
    }

    public getMock(): any {
        if (typeof Proxy === "undefined") {
            return this.mock;
        }
        return new Proxy(this.mock, this.createCatchAllHandlerForRemainingPropertiesWithoutGetters());
    }

    public createCatchAllHandlerForRemainingPropertiesWithoutGetters(): any {
        return {
            get: (target: any, name: PropertyKey) => {
                const hasMethodStub = name in target;
                if (!hasMethodStub) {
                    this.createPropertyStub(name.toString());
                    this.createInstancePropertyDescriptorListener(name.toString(), {}, this.clazz.prototype);
                }
                return target[name];
            },
        };
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

    protected processProperties(object: any): void {
        this.objectInspector.getObjectPrototypes(object).forEach((obj: any) => {
            this.objectInspector.getObjectOwnPropertyNames(obj).forEach((name: string) => {
                const descriptor = Object.getOwnPropertyDescriptor(obj, name);
                if (descriptor.get) {
                    this.createPropertyStub(name);
                    this.createInstancePropertyDescriptorListener(name, descriptor, obj);
                    this.createInstanceActionListener(name, obj);
                } else if (typeof descriptor.value === "function") {
                    this.createMethodStub(name);
                    this.createInstanceActionListener(name, obj);
                } else {
                    // no need to reassign properties
                }
            });
        });
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

    private processClassCode(clazz: any): void {
        const classCode = typeof clazz.toString !== "undefined" ? clazz.toString() : "";
        const functionNames = this.mockableFunctionsFinder.find(classCode);
        functionNames.forEach((functionName: string) => {
            this.createMethodStub(functionName);
            this.createInstanceActionListener(functionName, this.clazz.prototype);
        });
    }

    private processFunctionsCode(object: any): void {
        this.objectInspector.getObjectPrototypes(object).forEach((obj: any) => {
            this.objectInspector.getObjectOwnPropertyNames(obj).forEach((propertyName: string) => {
                const functionNames = this.mockableFunctionsFinder.find(this.objectPropertyCodeRetriever.get(obj, propertyName));
                functionNames.forEach((functionName: string) => {
                    this.createMethodStub(functionName);
                    this.createInstanceActionListener(functionName, this.clazz.prototype);
                });
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
