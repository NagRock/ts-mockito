import {AnyFunctionMatcher} from "./AnyFunctionMatcher";
import {AnyNumberMatcher} from "./AnyNumberMatcher";
import {AnyOfClassMatcher} from "./AnyOfClassMatcher";
import {AnyStringMatcher} from "./AnyStringMatcher";
import {AnythingMatcher} from "./AnythingMatcher";
import {BetweenMatcher} from "./BetweenMatcher";
import {DeepEqualMatcher} from "./DeepEqualMatcher";
import {Matcher} from "./Matcher";
import {MatchMatcher} from "./MatchMatcher";
import {NotNullMatcher} from "./NotNullMatcher";
import {ObjectContainingMatcher} from "./ObjectContainingMatcher";
import {StrictEqualMatcher} from "./StrictEqualMatcher";

export class NotOperator extends Matcher {
    private matcher: Matcher;

    public isMatching(value: any): boolean {
        if (!this.matcher) {
            throw new Error("Not matcher cannot be used a standalone matcher");
        }
        return !this.matcher.isMatching(value);
    }

    public toString(): string {
        const matcherRepresentation = this.matcher ? `.${this.matcher.toString()}` : '';
        return `not()${matcherRepresentation}`;
    }

    public anyOfClass<T>(expectedClass: {new (...args: any[]): T}): Matcher {
        this.matcher = new AnyOfClassMatcher<T>(expectedClass);
        return this;
    }

    public anyFunction(): Matcher {
        this.matcher = new AnyFunctionMatcher();
        return this;
    }

    public anyNumber(): Matcher {
        this.matcher = new AnyNumberMatcher();
        return this;
    }

    public anyString(): Matcher {
        this.matcher = new AnyStringMatcher();
        return this;
    }

    public anything(): Matcher {
        this.matcher = new AnythingMatcher();
        return this;
    }

    public between(min: number, max: number): Matcher {
        this.matcher = new BetweenMatcher(min, max);
        return this;
    }

    public deepEqual(expectedValue: any): Matcher {
        this.matcher = new DeepEqualMatcher(expectedValue);
        return this;
    }

    public notNull(): Matcher {
        this.matcher = new NotNullMatcher();
        return this;
    }

    public strictEqual(expectedValue: any): Matcher {
        this.matcher = new StrictEqualMatcher(expectedValue);
        return this;
    }

    public match(expectedValue: string | RegExp): Matcher {
        this.matcher = new MatchMatcher(expectedValue);
        return this;
    }

    public objectContaining(expectedValue: Object): Matcher {
        this.matcher = new ObjectContainingMatcher(expectedValue);
        return this;
    }
}
