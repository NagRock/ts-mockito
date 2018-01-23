import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyNumber} from "../../../src/ts-mockito";

describe("AnyNumberMatcher", () => {
    let testObj: Matcher;

    beforeEach(() => {
        testObj = anyNumber();
    });

    describe("checking if positive number is matching", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(3);
            const notResult = testObj.not().match(3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if negative number is matching", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(-3);
            const notResult = testObj.not().match(-3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if zero is matching", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(0);
            const notResult = testObj.not().match(0);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if string representation of number is matching", () => {
        it("returns false", () => {
            // when
            const result = testObj.match("5");
            const notResult = testObj.not().match("5");

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if object is matching", () => {
        it("returns false", () => {
            // when
            const result = testObj.match({});
            const notResult = testObj.not().match({});

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });
});
