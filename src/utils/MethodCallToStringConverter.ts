import {MatchersToStringConverter} from "../matcher/MatchersToStringConverter";
import {MethodToStub} from "../MethodToStub";

export class MethodCallToStringConverter {
    private matchersToStringConverter: MatchersToStringConverter = new MatchersToStringConverter();

    public convert(method: MethodToStub): string {
        const matchersAsString = this.matchersToStringConverter.convert(method.matchers);
        return `${method.name}(${matchersAsString})" `;
    }
}
