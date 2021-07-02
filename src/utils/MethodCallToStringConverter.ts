import {Matcher} from "../matcher/type/Matcher";
import {MethodAction} from "../MethodAction";
import {MethodToStub} from "../MethodToStub";

export class MethodCallToStringConverter {
    public convert(method: MethodToStub): string {
        const stringifiedMatchers = method.matchers.map((matcher: Matcher) => matcher.toString()).join(", ");
        return `${method.name}(${stringifiedMatchers})" `;
    }

    public convertActualCalls(calls: MethodAction[]): string[] {
        return calls.map(call => `${call.methodName}(${call.args.map(arg => arg.toString()).join(", ")})`);
    }
}
