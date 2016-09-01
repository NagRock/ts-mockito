import {MethodToStub} from './MethodToStub';
import {Matcher} from './matcher/Matcher';
import {MatchersToStringConverter} from './matcher/MatchersToStringConverter';

export class MethodStubVerificator<T> {
    private matchersToStringConverter:MatchersToStringConverter = new MatchersToStringConverter();

    constructor(private methodToVerify: MethodToStub) {

    }

    public called():void {
        this.atLeast(1);
    }

    public never():void {
        this.times(0);
    }

    public once(): void {
        this.times(1);
    }

    public twice(): void {
        this.times(2);
    }

    public thrice(): void {
        this.times(3);
    }

    public times(value: number) {
        let allMatchingActions = this.methodToVerify.mock.getAllMatchingActions(this.methodToVerify.matchers);
        if (value !== allMatchingActions.length) {
            let msg = this.getErrorBeginning(this.methodToVerify.matchers);
            throw new Error(msg + 'to be called ' + value + ' time(s). But has been called ' + allMatchingActions.length + ' time(s).');
        }
    }

    public atLeast(value: number) {
        let allMatchingActions = this.methodToVerify.mock.getAllMatchingActions(this.methodToVerify.matchers);
        if (value > allMatchingActions.length) {
            let msg = this.getErrorBeginning(this.methodToVerify.matchers);
            throw new Error(msg + 'to be called at least ' + value + ' time(s). But has been called ' + allMatchingActions.length + ' time(s).');
        }
    }

    public atMost(value: number) {
        let allMatchingActions = this.methodToVerify.mock.getAllMatchingActions(this.methodToVerify.matchers);
        if (value < allMatchingActions.length) {
            let msg = this.getErrorBeginning(this.methodToVerify.matchers);
            throw new Error(msg + 'to be called at least ' + value + ' time(s). But has been called ' + allMatchingActions.length + ' time(s).');
        }
    }

    private getErrorBeginning(matchers:Array<Matcher>):string {
        let matchersAsString = this.matchersToStringConverter.convert(matchers);
        return 'Expected "' + this.methodToVerify.name + '(' + matchersAsString + ')" ';
    }
}