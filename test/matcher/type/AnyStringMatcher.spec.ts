import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyString, not} from "../../../src/ts-mockito";

describe("AnyStringMatcher", () => {
    let testObj: Matcher;
    let notTestObj: Matcher;

    beforeEach(() => {
        testObj = anyString();
        notTestObj = not().anyString();
    });

    describe("checking if number matches", () => {
        it("returns false for original matcher and true for not().", () => {
            // when
            const result = testObj.match(3);
            const notResult = notTestObj.match(3);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if object matches", () => {
        it("returns false for original matcher and true for not().", () => {

            // when
            const result = testObj.match({});
            const notResult = notTestObj.match({});

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
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
});
