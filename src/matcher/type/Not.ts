import {AnyFunctionMatcher} from "./AnyFunctionMatcher";
import {AnyNumberMatcher} from "./AnyNumberMatcher";
import {AnyOfClassMatcher} from "./AnyOfClassMatcher";
import {AnyStringMatcher} from "./AnyStringMatcher";
import {AnythingMatcher} from "./AnythingMatcher";
import {BetweenMatcher} from "./BetweenMatcher";
import {DeepEqualMatcher} from "./DeepEqualMatcher";
import {Matcher} from "./Matcher";
import {MatchStringMatcher} from "./MatchMatcher";
import {NotNullMatcher} from "./NotNullMatcher";
import {ObjectContainingMatcher} from "./ObjectContainingMatcher";
import {StrictEqualMatcher} from "./StrictEqualMatcher";

export class Not {

    public anyOfClass<T>(expectedClass: {new (...args: any[]): T}): Matcher {
        return (new AnyOfClassMatcher<T>(expectedClass)).reverse();
    }

    public anyFunction(): Matcher {
        return (new AnyFunctionMatcher()).reverse();
    }

    public anyNumber(): Matcher {
        return (new AnyNumberMatcher()).reverse();
    }

    public anyString(): Matcher {
        return (new AnyStringMatcher()).reverse();
    }

    public anything(): Matcher {
        return (new AnythingMatcher()).reverse();
    }

    public between(min: number, max: number): Matcher {
        return (new BetweenMatcher(min, max)).reverse();
    }

    public deepEqual(expectedValue: any): Matcher {
        return (new DeepEqualMatcher(expectedValue)).reverse();
    }

    public notNull(): Matcher {
        return (new NotNullMatcher()).reverse();
    }

    public strictEqual(expectedValue: any): Matcher {
        return (new StrictEqualMatcher(expectedValue)).reverse();
    }

    public match(expectedValue: string | RegExp): Matcher {
        return (new MatchStringMatcher(expectedValue)).reverse();
    }

    public objectContaining(expectedValue: Object): Matcher {
        return (new ObjectContainingMatcher(expectedValue)).reverse();
    }

}
