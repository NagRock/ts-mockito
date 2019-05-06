import {Matcher} from "../../../src/matcher/type/Matcher";
import {startsWith} from "../../../src/ts-mockito";

describe("StartsWithMatcher", () => {
    describe("checking if value starts with given value", () => {
        const testObj: Matcher = startsWith("abc") as any;

        describe("when given value starts with string", () => {
            it("returns true", () => {
                // when
                const result = testObj.match("abc 123");

                // then
                expect(result).toBeTruthy();
            });

            it("describes the matcher", () => {
                expect(testObj.toString()).toEqual("startsWith(abc)");
            });
        });

        describe("when given value doesn\'t start with string", () => {
            it("returns false", () => {
                // when
                const result = testObj.match("123 abc");

                // then
                expect(result).toBeFalsy();
            });
        });
    });
});
