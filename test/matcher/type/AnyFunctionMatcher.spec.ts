import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyFunction} from "../../../src/ts-mockito";

describe("AnyFunctionMatcher", () => {
    let testObj: Matcher;

    beforeEach(() => {
        testObj = anyFunction();
    });

    describe("checking if function is function", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(() => "arbitrary return value");
            const notResult = testObj.not().match(() => "arbitrary return value");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if string is function", () => {
        it("returns false", () => {
            // when
            const result = testObj.match("some string");
            const notResult = testObj.not().match("some string");

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if number is function", () => {
        it("returns false", () => {
            // when
            const result = testObj.match(5);
            const notResult = testObj.not().match(5);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if object is function", () => {
        it("returns false", () => {
            // when
            const result = testObj.match({prop1: "prop1Value"});
            const notResult = testObj.not().match({prop1: "prop1Value"});

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if toString works", () => {
        it("returns 'anyFunction()'", () => {
            // when
            const result = testObj.toString();
            const notResult = testObj.not().toString();

            // then
            expect(result).toEqual("anyFunction()");
            expect(notResult).toEqual("not().anyFunction()");
        });
    });

});
