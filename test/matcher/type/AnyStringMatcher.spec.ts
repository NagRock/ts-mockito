import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyString} from "../../../src/ts-mockito";

describe("AnyStringMatcher", () => {
    let testObj: Matcher;

    beforeEach(() => {
        testObj = anyString();
    });

    describe("checking if number matches", () => {
        it("returns false", () => {
            // when
            const result = testObj.match(3);
            const notResult = testObj.not().match(3);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if object matches", () => {
        it("returns false", () => {

            // when
            const result = testObj.match({});
            const notResult = testObj.not().match({});

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
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
});
