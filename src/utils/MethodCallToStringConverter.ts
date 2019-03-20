import {Matcher} from "../matcher/type/Matcher";
import {MethodToStub} from "../MethodToStub";

export class MethodCallToStringConverter {
    public convert(method: MethodToStub): string {
        const stringifiedMatchers = method.matchers.map((matcher: Matcher) => matcher.toString()).join(", ");
        return `${method.methodName}(${stringifiedMatchers})" `;
    }
}
