import {Matcher} from './type/Matcher';

export class ArgsToMatchersValidator {
    public validate(matchers: Array<Matcher>, args:any[]):boolean {
        let allValid = true;
        let index: number = 0;
        for (let arg of args) {
            if (!matchers[index].match(arg)) {
                allValid = false;
            }
            index++;
        }
        return allValid;
    }
}