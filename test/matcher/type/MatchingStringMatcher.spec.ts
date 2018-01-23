import {Matcher} from "../../../src/matcher/type/Matcher";
import {matchString, not} from "../../../src/ts-mockito";

describe("MatchingStringMatcher", () => {
    describe("checking if value matches given regexp", () => {
        const testObj: Matcher = matchString(/\w123/);
        const notTestObj: Matcher = not().matchString(/\w123/);

        describe("when given value matches regexp", () => {
            it("returns true", () => {
                // when
                const result = testObj.match("a123");
                const notResult = notTestObj.match("a123");

                // then
                expect(result).toBeTruthy();
                expect(notResult).toBeFalsy();
            });
        });

        describe("when given value doesn\'t match regexp", () => {
            it("returns false", () => {
                // when
                const result = testObj.match("123");
                const notResult = notTestObj.match("123");

                // then
                expect(result).toBeFalsy();
                expect(notResult).toBeTruthy();
            });
        });
    });

});
