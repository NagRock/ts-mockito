import {Matcher} from "../../../src/matcher/type/Matcher";
import {anything} from "../../../src/ts-mockito";

describe("AnythingMatcher", () => {
    let testObj: Matcher;

    beforeEach(() => {
        testObj = anything();
    });

    describe("checking if number matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(3);
            const notResult = testObj.not().match(3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if object matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match({});
            const notResult = testObj.not().match({});

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if empty string matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match("");
            const notResult = testObj.not().match("");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if sample string matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match("sampleString");
            const notResult = testObj.not().match("sampleString");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if null matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(null);
            const notResult = testObj.not().match(null);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });
});
