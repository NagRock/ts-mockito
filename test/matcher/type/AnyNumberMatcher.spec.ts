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
        it("returns true", () => {
            // when
            const result = testObj.match(3);
            const notResult = notTestObj.match(3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if negative number is matching", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(-3);
            const notResult = notTestObj.match(-3);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if zero is matching", () => {
        it("returns true", () => {
            // when
            const result = testObj.match(0);
            const notResult = notTestObj.match(0);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if string representation of number is matching", () => {
        it("returns false", () => {
            // when
            const result = testObj.match("5");
            const notResult = notTestObj.match("5");

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if object is matching", () => {
        it("returns false", () => {
            // when
            const result = testObj.match({});
            const notResult = notTestObj.match({});

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });
});
