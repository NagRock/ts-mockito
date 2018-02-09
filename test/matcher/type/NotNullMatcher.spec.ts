import {Matcher} from "../../../src/matcher/type/Matcher";
import {not, notNull} from "../../../src/ts-mockito";

describe("NotNullMatcher", () => {
    let testObj: Matcher;
    let notTestObj: Matcher;

    beforeEach(() => {
        testObj = notNull();
        notTestObj = not().notNull();
    });

    describe("checking if null matches", () => {
        it("returns false for original matcher and true for not().", () => {
            // when
            const result = testObj.isMatching(null);
            const notResult = notTestObj.isMatching(null);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if false matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(false);
            const notResult = notTestObj.isMatching(false);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if zero matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(0);
            const notResult = notTestObj.isMatching(0);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if sample object matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching({});
            const notResult = notTestObj.isMatching({});

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
});
