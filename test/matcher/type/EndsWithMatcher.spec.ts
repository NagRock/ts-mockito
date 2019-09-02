import {Matcher} from "../../../src/matcher/type/Matcher";
import {endsWith} from "../../../src/ts-mockito";

describe("EndsWithMatcher", () => {
    describe("checking if value starts with given value", () => {
        const testObj: Matcher = endsWith("abc") as any;

        describe("when given value ends with string", () => {
            it("returns true", () => {
                // when
                const result = testObj.match("123 abc");

                // then
                expect(result).toBeTruthy();
            });

            it("describes the matcher", () => {
                expect(testObj.toString()).toEqual("endsWith(abc)");
            });
        });

        describe("when given value doesn\'t end with string", () => {
            it("returns false", () => {
                // when
                const result = testObj.match("abc 123");

                // then
                expect(result).toBeFalsy();
            });
        });
    });
});
