import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyNumber} from "../../../src/ts-mockito";

describe("AnyNumberMatcher", () => {
    describe("checking if positive number is matching", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anyNumber();

            // when
            const result = testObj.match(3);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if negative number is matching", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anyNumber();

            // when
            const result = testObj.match(-3);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if zero is matching", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = anyNumber();

            // when
            const result = testObj.match(0);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if string representation of number is matching", () => {
        it("returns false", () => {
            // given
            const testObj: Matcher = anyNumber();

            // when
            const result = testObj.match("5");

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if object is matching", () => {
        it("returns false", () => {
            // given
            const testObj: Matcher = anyNumber();

            // when
            const result = testObj.match({});

            // then
            expect(result).toBeFalsy();
        });
    });
});
