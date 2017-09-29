import {Matcher} from "../../../src/matcher/type/Matcher";
import {anything} from "../../../src/ts-mockito";

describe("AnythingMatcher", () => {
    describe("checking if number matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anything();

            // when
            const result = testObj.match(3);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if object matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anything();

            // when
            const result = testObj.match({});

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if empty string matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anything();

            // when
            const result = testObj.match("");

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if sample string matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anything();

            // when
            const result = testObj.match("sampleString");

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if null matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anything();

            // when
            const result = testObj.match(null);

            // then
            expect(result).toBeTruthy();
        });
    });
});
