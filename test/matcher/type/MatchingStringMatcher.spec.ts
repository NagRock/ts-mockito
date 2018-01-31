import {Matcher} from "../../../src/matcher/type/Matcher";
import {match} from "../../../src/ts-mockito";

describe("MatchingStringMatcher", () => {
    describe("checking if value matches given regexp", () => {
        const testObj: Matcher = match(/\w123/);

        describe("when given value matches regexp", () => {
            it("returns true", () => {
                // when
                const result = testObj.match("a123");

                // then
                expect(result).toBeTruthy();
            });
        });

        describe("when given value doesn\'t match regexp", () => {
            it("returns false", () => {
                // when
                const result = testObj.match("123");

                // then
                expect(result).toBeFalsy();
            });
        });
    });

});
