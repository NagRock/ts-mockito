import {Matcher} from './Matcher';

export class MatchersToStringConverter {
    public convert(matchers: Array<Matcher>): string {
        let result: string = '';
        for (let matcher of matchers) {
            result += matcher.toString();
        }
        return result;
    }
}
