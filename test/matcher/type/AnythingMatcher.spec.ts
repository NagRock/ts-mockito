import {Matcher} from "../../../src/matcher/type/Matcher";
import {anything, not} from "../../../src/ts-mockito";

describe("AnythingMatcher", () => {
    let testObj: Matcher;
    let notTestObj: Matcher;

    beforeEach(() => {
        testObj = anything();
        notTestObj = not().anything();
    });

    describe("checking if number matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(3);
            const notResult = notTestObj.isMatching(3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if object matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching({});
            const notResult = notTestObj.isMatching({});

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if empty string matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching("");
            const notResult = notTestObj.isMatching("");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if sample string matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching("sampleString");
            const notResult = notTestObj.isMatching("sampleString");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if null matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(null);
            const notResult = notTestObj.isMatching(null);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });
});
