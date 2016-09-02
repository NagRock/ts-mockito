import {Matcher} from '../matcher/type/Matcher';
import {ArgsToMatchersValidator} from '../matcher/ArgsToMatchersValidator';
import {MethodStub} from './MethodStub';

export class ReturnValueMethodStub implements MethodStub {
    private validator: ArgsToMatchersValidator = new ArgsToMatchersValidator();

    constructor(private matchers: Array<Matcher>, private returns: any) {
    }

    public isApplicable(args: any[]): boolean {
        return this.validator.validate(this.matchers, args);
    }

    public execute(args: any[]): void {

    }

    public getValue(): any {
        return this.returns;
    }
}