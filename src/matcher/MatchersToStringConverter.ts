import {Matcher} from "./type/Matcher";

export class MatchersToStringConverter {
    public convert(matchers: Matcher[]): string {
        return matchers.map((matcher: Matcher) => matcher.toString()).join(", ");
    }
}
