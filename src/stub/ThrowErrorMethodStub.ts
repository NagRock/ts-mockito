import {Matcher} from '../matcher/type/Matcher';
import {ArgsToMatchersValidator} from '../matcher/ArgsToMatchersValidator';
import {MethodStub} from './MethodStub';

export class ThrowErrorMethodStub implements MethodStub {
    private validator: ArgsToMatchersValidator = new ArgsToMatchersValidator();

    constructor(private matchers: Array<Matcher>, private error: Error) {

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