import {MethodAction} from "../src/MethodAction";
import {strictEqual} from "../src/ts-mockito";

describe("MethodAction", () => {
    describe("checking if method with matchers is applicable", () => {
        describe("when all matchers match", () => {
            it("returns true", () => {
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
            it("returns false", () => {
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
