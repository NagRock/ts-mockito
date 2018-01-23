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
        it("returns false", () => {
            // when
            const result = testObj.match(null);
            const notResult = notTestObj.match(null);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if false matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(false);
            const notResult = notTestObj.match(false);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if zero matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(0);
            const notResult = notTestObj.match(0);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if sample object matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match({});
            const notResult = notTestObj.match({});

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if sample string matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match("sampleString");
            const notResult = notTestObj.match("sampleString");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });
});
