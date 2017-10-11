import {MatchersToStringConverter} from "../matcher/MatchersToStringConverter";
import {MethodToStub} from "../MethodToStub";

export class MethodCallToStringConverter {
    private matchersToStringConverter: MatchersToStringConverter = new MatchersToStringConverter();

    public convert(method: MethodToStub): string {
        return `${method.name}(${this.matchersToStringConverter.convert(method.matchers)})" `;
    }
}
