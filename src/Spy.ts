import * as _ from 'lodash';
import {Mocker} from "./Mock";
import {MethodStub} from "./stub/MethodStub";
import {CallThroughMethodStub} from "./stub/CallThroughMethodStub";

export class Spy extends Mocker {
    private realMethods: { [key: string]: Function };

    constructor(instance: any) {
        super(instance.constructor, instance);

        this.createInstanceActionListenersFromOwnPropertyDescriptors(instance, false);
        this.createInstanceActionListenersFromOwnPropertyNames(instance, false);
    }

    public reset(): void {
        _.forEach(this.realMethods, (method, key) => {
            const descriptor = Object.getOwnPropertyDescriptor(this.realMethods, key);

            if (descriptor.get) {
                Object.defineProperty(this.instance, key, {
                    get: method as any
                });
            } else {
                this.instance[key] = method;
            }
        });

        super.reset();
    }

    protected getEmptyMethodStub(key: string, args: any[]): MethodStub {
        if (this.realMethods[key]) {
            return new CallThroughMethodStub(this.instance, this.realMethods[key]);
        }

        return super.getEmptyMethodStub(key, args);
    }

    protected createInstancePropertyDescriptorListener(key: string, descriptor?: PropertyDescriptor): void {
        if (!this.realMethods) {
            this.realMethods = {};
        }

        if (this.realMethods[key]) {
            return;
        }

        Object.defineProperty(this.realMethods, key, {get: descriptor.get});
        Object.defineProperty(this.instance, key, {
            get: this.createActionListener(key)
        });
    }

    protected createInstanceActionListener(key: string): void {
        if (!this.realMethods) {
            this.realMethods = {};
        }

        if (this.realMethods[key]) {
            return;
        }

        this.realMethods[key] = this.instance[key];
        this.instance[key] = this.createActionListener(key);
    }
}
