export class MethodAction {
    constructor(public methodName: string, public args: Array<any>){

    }

    public isApplicable(methodName:string, matchers): boolean {
        if (this.methodName != methodName) {
            return false;
        }
        let allValid = true;
        let index: number = 0;
        for (let arg of this.args) {
            if (matchers[index] && !matchers[index].match(arg)) {
                allValid = false;
            }
        }
        return allValid;
    }
}