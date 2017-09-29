import {Matcher} from "./type/Matcher";

export class MatchersToStringConverter {
    public convert(matchers: Array<Matcher>): string {
        const result: string[] = [];
        for (const matcher of matchers) {
            result.push(matcher.toString());
        }
        return result.join(", ");
    }
}
