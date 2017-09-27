import {Matcher} from "./matcher/type/Matcher";

export class MethodAction {
    private static globalCallIndex: number = 0;
    private callIndex: number;

    constructor(public methodName: string, public args: Array<any>) {
        this.callIndex = ++MethodAction.globalCallIndex;
    }

    public isApplicable(methodName: string, matchers: Matcher[]): boolean {
        if (this.methodName !== methodName) {
            return false;
        }
        let allValid = true;
        let index: number = 0;
        for (const arg of this.args) {
            if (matchers[index] && !matchers[index].match(arg)) {
                allValid = false;
            }
            index++;
        }
        return allValid;
    }

    public getCallIndex(): number {
        return this.callIndex;
    }

    public hasBeenCalledBefore(action: MethodAction): boolean {
        return this.getCallIndex() < action.getCallIndex();
    }
}
