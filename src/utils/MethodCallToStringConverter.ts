import {MethodToStub} from "../MethodToStub";
import {MatchersToStringConverter} from "../matcher/MatchersToStringConverter";

export class MethodCallToStringConverter {
    private matchersToStringConverter: MatchersToStringConverter = new MatchersToStringConverter();

    public convert(method: MethodToStub): string {
        let matchersAsString = this.matchersToStringConverter.convert(method.matchers);
        return method.name + '(' + matchersAsString + ')" ';
    }
}