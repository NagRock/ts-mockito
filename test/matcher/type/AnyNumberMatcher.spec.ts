import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyNumber, not} from "../../../src/ts-mockito";

describe("AnyNumberMatcher", () => {
    let testObj: Matcher;
    let notTestObj: Matcher;

    beforeEach(() => {
        testObj = anyNumber();
        notTestObj = not().anyNumber();
    });

    describe("checking if positive number is matching", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(3);
            const notResult = notTestObj.isMatching(3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if negative number is matching", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(-3);
            const notResult = notTestObj.isMatching(-3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if zero is matching", () => {
        it("returns true for original matcher and false for not().", () => {
            // when
            const result = testObj.isMatching(0);
            const notResult = notTestObj.isMatching(0);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if string representation of number is matching", () => {
        it("returns false for original matcher and true for not().", () => {
            // when
            const result = testObj.isMatching("5");
            const notResult = notTestObj.isMatching("5");

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if object is matching", () => {
        it("returns false for original matcher and true for not().", () => {
            // when
            const result = testObj.isMatching({});
            const notResult = notTestObj.isMatching({});

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });
});
