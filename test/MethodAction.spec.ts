import {strictEqual} from "../src/matcher/type/StrictEqualMatcher";
import {MethodAction} from "../src/MethodAction";

describe('MethodAction', () => {
    describe('checking if method with matchers is applicable', () => {
        describe('when all matchers match', () => {
            it('returns true', () => {
                // given
                const methodName = "sampleMethodName";
                const firstArg = 5;
                const secondArg = "sampleString";
                let testObj: MethodAction = new MethodAction(methodName, [firstArg, secondArg]);

                // when
                let result = testObj.isApplicable(methodName, [strictEqual(firstArg), strictEqual(secondArg)]);

                // then
                expect(result).toBeTruthy();
            });
        });
        describe('when one matcher doesn`t match', () => {
            it('returns false', () => {
                // given
                const methodName = "sampleMethodName";
                const firstArg = 5;
                const secondArg = "sampleString";
                const notMatchingArg = "notMatchingArg";
                let testObj: MethodAction = new MethodAction(methodName, [firstArg, notMatchingArg]);

                // when
                let result = testObj.isApplicable(methodName, [strictEqual(firstArg), strictEqual(secondArg)]);

                // then
                expect(result).toBeFalsy();
            });
        });
    });
});