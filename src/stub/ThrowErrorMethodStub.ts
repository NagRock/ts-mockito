import {ArgsToMatchersValidator} from "../matcher/ArgsToMatchersValidator";
import {Matcher} from "../matcher/type/Matcher";
import {AbstractMethodStub} from "./AbstractMethodStub";
import {MethodStub} from "./MethodStub";

export class ThrowErrorMethodStub extends AbstractMethodStub implements MethodStub {
    private validator: ArgsToMatchersValidator = new ArgsToMatchersValidator();

    constructor(protected groupIndex: number, private matchers: Array<Matcher>, private error: Error) {
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
