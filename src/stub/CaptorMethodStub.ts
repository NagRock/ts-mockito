import {Matcher} from '../matcher/type/Matcher';
import {ArgsToMatchersValidator} from '../matcher/ArgsToMatchersValidator';
import {MethodStub} from './MethodStub';
import {Captor} from '../Captor';

export class CaptorMethodStub implements MethodStub {
    private validator: ArgsToMatchersValidator = new ArgsToMatchersValidator();

    constructor(private matchers: Array<Matcher>, private captors: Captor<any>[]) {

    }

    public isApplicable(args: any[]): boolean {
        return this.validator.validate(this.matchers, args);
    }

    public execute(args: any[]): void {
        let index = 0;
        for (let arg of args) {
            this.captors[index].addValue(arg);
            index++;
        }
    }

    public getValue(): any {
        return null;
    }
}