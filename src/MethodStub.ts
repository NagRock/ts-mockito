import {Matcher} from './matcher/Matcher';

export class MethodStub {
    constructor(private matchers: Array<Matcher>, private returns: any) {

    }

    public isApplicable(args): boolean {
        let allValid = true;
        let index: number = 0;
        for (let arg of args) {
            if (!this.matchers[index].match(arg)) {
                allValid = false;
            }
            index++;
        }
        return allValid;
    }

    public getValue(): any {
        if(this.returns && this.returns.error != null) {
            throw this.returns.error;
        }

        return this.returns;
    }
}