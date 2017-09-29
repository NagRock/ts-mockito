import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyString} from "../../../src/ts-mockito";

describe("AnyStringMatcher", () => {
    describe("checking if number matches", () => {
        it("returns false", () => {
            // given
            const testObj: Matcher = anyString();

            // when
            const result = testObj.match(3);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if object matches", () => {
        it("returns false", () => {
            // given
            const testObj: Matcher = anyString();

            // when
            const result = testObj.match({});

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if empty string matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anyString();

            // when
            const result = testObj.match("");

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if sample string matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anyString();

            // when
            const result = testObj.match("sampleString");

            // then
            expect(result).toBeTruthy();
        });
    });
});
