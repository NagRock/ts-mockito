import {MethodAction} from "../src/MethodAction";
import {strictEqual} from "../src/ts-mockito";

describe("MethodAction", () => {
    describe("checking if method with matchers is applicable", () => {
        describe("when all matchers match", () => {
            it("returns true for original matcher and false for not().", () => {
                // given
                const methodName = "sampleMethodName";
                const firstArg = 5;
                const secondArg = "sampleString";
                const testObj: MethodAction = new MethodAction(methodName, [firstArg, secondArg]);

                // when
                const result = testObj.isApplicable(methodName, [strictEqual(firstArg), strictEqual(secondArg)]);

                // then
                expect(result).toBeTruthy();
            });
        });
        describe("when one matcher doesn`t match", () => {
            it("returns false for original matcher and true for not().", () => {
                // given
                const methodName = "sampleMethodName";
                const firstArg = 5;
                const secondArg = "sampleString";
                const notMatchingArg = "notMatchingArg";
                const testObj: MethodAction = new MethodAction(methodName, [firstArg, notMatchingArg]);

                // when
                const result = testObj.isApplicable(methodName, [strictEqual(firstArg), strictEqual(secondArg)]);

                // then
                expect(result).toBeFalsy();
            });
        });
    });
});
