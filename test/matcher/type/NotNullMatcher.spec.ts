import {Matcher} from "../../../src/matcher/type/Matcher";
import {notNull} from "../../../src/ts-mockito";

describe("NotNullMatcher", () => {
    let testObj: Matcher;

    beforeEach(() => {
        testObj = notNull();

    });

    describe("checking if null matches", () => {
        it("returns false", () => {
            // when
            const result = testObj.match(null);
            const notResult = testObj.not().match(null);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if false matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(false);
            const notResult = testObj.not().match(false);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if zero matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(0);
            const notResult = testObj.not().match(0);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if sample object matches", () => {
        it("returns true", () => {
            // when
            const result = testObj.match({});
            const notResult = testObj.not().match({});

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
});
