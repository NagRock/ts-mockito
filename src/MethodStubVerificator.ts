import {MethodToStub} from "./MethodToStub";
import {MethodCallToStringConverter} from "./utils/MethodCallToStringConverter";

export class MethodStubVerificator<T> {
    private methodCallToStringConverter: MethodCallToStringConverter = new MethodCallToStringConverter();

    constructor(private methodToVerify: MethodToStub) {

    }

    public called(): void {
        this.atLeast(1);
    }

    public never(): void {
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

    public times(value: number): void {
        let allMatchingActions = this.methodToVerify.mock.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value !== allMatchingActions.length) {
            let methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            throw new Error('Expected "' + methodToVerifyAsString + 'to be called ' + value + ' time(s). But has been called ' + allMatchingActions.length + ' time(s).');
        }
    }

    public atLeast(value: number): void {
        let allMatchingActions = this.methodToVerify.mock.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value > allMatchingActions.length) {
            let methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            throw new Error('Expected "' + methodToVerifyAsString + 'to be called at least ' + value + ' time(s). But has been called ' + allMatchingActions.length + ' time(s).');
        }
    }

    public atMost(value: number): void {
        let allMatchingActions = this.methodToVerify.mock.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value < allMatchingActions.length) {
            let methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            throw new Error('Expected "' + methodToVerifyAsString + 'to be called at least ' + value + ' time(s). But has been called ' + allMatchingActions.length + ' time(s).');
        }
    }

    public calledBefore(method: any): void {
        const firstMethodAction = this.methodToVerify.mock.getFirstMatchingAction(this.methodToVerify.name, this.methodToVerify.matchers);
        const secondMethodAction = method.mock.getFirstMatchingAction(method.name, method.matchers);
        let mainMethodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
        let secondMethodAsString = this.methodCallToStringConverter.convert(method);
        let errorBeginning = 'Expected "' + mainMethodToVerifyAsString + 'to be called before ' + secondMethodAsString;

        if (firstMethodAction && secondMethodAction) {
            if (!firstMethodAction.hasBeenCalledBefore(secondMethodAction)) {
                throw new Error(errorBeginning + 'but has been called after.');
            }
        } else if (firstMethodAction && !secondMethodAction) {
            throw new Error(errorBeginning + 'but ' + secondMethodAsString + 'has never been called.');
        } else if (!firstMethodAction && secondMethodAction) {
            throw new Error(errorBeginning + 'but ' + mainMethodToVerifyAsString + 'has never been called.');
        } else {
            throw new Error(errorBeginning + 'but none of them has been called.');
        }
    }

    public calledAfter(method: any): void {
        const firstMethodAction = this.methodToVerify.mock.getFirstMatchingAction(this.methodToVerify.name, this.methodToVerify.matchers);
        const secondMethodAction = method.mock.getFirstMatchingAction(method.name, method.matchers);
        let mainMethodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
        let secondMethodAsString = this.methodCallToStringConverter.convert(method);
        let errorBeginning = 'Expected "' + mainMethodToVerifyAsString + 'to be called after ' + secondMethodAsString;

        if (firstMethodAction && secondMethodAction) {
            if (firstMethodAction.hasBeenCalledBefore(secondMethodAction)) {
                throw new Error(errorBeginning + 'but has been called before.');
            }
        } else if (firstMethodAction && !secondMethodAction) {
            throw new Error(errorBeginning + 'but ' + secondMethodAsString + 'has never been called.');
        } else if (!firstMethodAction && secondMethodAction) {
            throw new Error(errorBeginning + 'but ' + mainMethodToVerifyAsString + 'has never been called.');
        } else {
            throw new Error(errorBeginning + 'but none of them has been called.');
        }
    }
}