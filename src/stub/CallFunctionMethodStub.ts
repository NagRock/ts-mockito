import {Matcher} from '../matcher/type/Matcher';
import {ArgsToMatchersValidator} from '../matcher/ArgsToMatchersValidator';
import {MethodStub} from './MethodStub';

export class CallFunctionMethodStub implements MethodStub {
    private validator: ArgsToMatchersValidator = new ArgsToMatchersValidator();
    private functionResult: any;

    constructor(private matchers: Array<Matcher>, private func: any) {
    }

    public isApplicable(args: any[]): boolean {
        return this.validator.validate(this.matchers, args);
    }

    public execute(args: any[]): void {
        this.functionResult = this.func(...args);
    }

    public getValue(): any {
        return this.functionResult;
    }
}