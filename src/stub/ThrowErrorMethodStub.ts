import {Matcher} from '../matcher/type/Matcher';
import {ArgsToMatchersValidator} from '../matcher/ArgsToMatchersValidator';
import {MethodStub} from './MethodStub';
import {AbstractMethodStub} from "./AbstractMethodStub";

export class ThrowErrorMethodStub extends AbstractMethodStub implements MethodStub {
    private validator: ArgsToMatchersValidator = new ArgsToMatchersValidator();

    constructor(protected groupIndex:number, private matchers: Array<Matcher>, private error: Error) {
        super();
    }

    public isApplicable(args: any[]): boolean {
        return this.validator.validate(this.matchers, args);
    }

    public execute(args: any[]): void {
        throw this.error;
    }

    public getValue(): any {
        return null;
    }
}