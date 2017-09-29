import {ArgsToMatchersValidator} from "../matcher/ArgsToMatchersValidator";
import {Matcher} from "../matcher/type/Matcher";
import {AbstractMethodStub} from "./AbstractMethodStub";
import {MethodStub} from "./MethodStub";

export class CallFunctionMethodStub extends AbstractMethodStub implements MethodStub {
    private validator: ArgsToMatchersValidator = new ArgsToMatchersValidator();
    private functionResult: any;

    constructor(protected groupIndex: number, private matchers: Array<Matcher>, private func: any) {
        super();
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
