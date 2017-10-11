import {Matcher} from "./type/Matcher";

export class ArgsToMatchersValidator {
    public validate(matchers: Matcher[], args: any[]): boolean {
        if (matchers.length !== args.length) {
            return false;
        }
        return matchers.every((matcher: Matcher, index: number) => matcher.match(args[index]));
    }
}
