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
            const result = testObj.match(3);
            const notResult = notTestObj.match(3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if object matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.match({});
            const notResult = notTestObj.match({});

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if empty string matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.match("");
            const notResult = notTestObj.match("");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if sample string matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.match("sampleString");
            const notResult = notTestObj.match("sampleString");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if null matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.match(null);
            const notResult = notTestObj.match(null);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });
});
