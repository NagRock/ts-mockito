import {Matcher} from "./matcher/type/Matcher";

export class MethodAction {
    private static globalCallIndex: number = 0;
    private callIndex: number;

    constructor(public methodName: string, public args: any[]) {
        this.callIndex = ++MethodAction.globalCallIndex;
    }

    public isApplicable(methodName: string, matchers: Matcher[]): boolean {
        const methodNameMatch = this.methodName === methodName;
        const argumentsCountMatch = this.args.length === matchers.length;
        if (!methodNameMatch || !argumentsCountMatch) {
            return false;
        }
        return matchers.every((matcher: Matcher, index: number) => matcher.match(this.args[index]));
    }

    public getCallIndex(): number {
        return this.callIndex;
    }

    public hasBeenCalledBefore(action: MethodAction): boolean {
        return this.getCallIndex() < action.getCallIndex();
    }
}
