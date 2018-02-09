import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyFunction, not} from "../../../src/ts-mockito";

describe("AnyFunctionMatcher", () => {
    let testObj: Matcher;
    let notTestObj: Matcher;

    beforeEach(() => {
        testObj = anyFunction();
        notTestObj = not().anyFunction();
    });

    describe("checking if function is function", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(() => "arbitrary return value");
            const notResult = notTestObj.isMatching(() => "arbitrary return value");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if string is function", () => {
        it("returns false for original matcher and true for not().", () => {
            // when
            const result = testObj.isMatching("some string");
            const notResult = notTestObj.isMatching("some string");

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if number is function", () => {
        it("returns false for original matcher and true for not().", () => {
            // when
            const result = testObj.isMatching(5);
            const notResult = notTestObj.isMatching(5);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if object is function", () => {
        it("returns false for original matcher and true for not().", () => {
            // when
            const result = testObj.isMatching({prop1: "prop1Value"});
            const notResult = notTestObj.isMatching({prop1: "prop1Value"});

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if toString works", () => {
        it("returns 'anyFunction()'", () => {
            // when
            const result = testObj.toString();

            // then
            expect(result).toEqual("anyFunction()");
        });

        it("returns 'not().anyFunction()' for .not() matcher", () => {
            // when
            const notResult = notTestObj.toString();

            // then
            expect(notResult).toEqual("not().anyFunction()");
        });
    });

});
