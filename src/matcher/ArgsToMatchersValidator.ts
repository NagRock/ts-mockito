import {Matcher} from "./type/Matcher";

export class ArgsToMatchersValidator {
    public validate(matchers: Array<Matcher>, args: any[]): boolean {
        if (matchers.length !== args.length) {
            return false;
        }
        let allValid = true;
        let index: number = 0;
        for (const arg of args) {
            if (!matchers[index].match(arg)) {
                allValid = false;
            }
            index++;
        }
        return allValid;
    }
}
