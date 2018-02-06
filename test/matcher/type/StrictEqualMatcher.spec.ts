import {Matcher} from "../../../src/matcher/type/Matcher";
import {not, strictEqual} from "../../../src/ts-mockito";

describe("StrictEqualMatcher", () => {
    describe("checking if string representation of number matches with number", () => {
        it("returns false for original matcher and true for not().", () => {
            // given
            const testObj: Matcher = strictEqual("5");
            const notTestObj: Matcher = not().strictEqual("5");

            // when
            const result = testObj.match(5);
            const notResult = notTestObj.match(5);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if false matches with zero", () => {
        it("returns false for original matcher and true for not().", () => {
            // given
            const testObj: Matcher = strictEqual(false);
            const notTestObj: Matcher = not().strictEqual(false);

            // when
            const result = testObj.match(0);
            const notResult = notTestObj.match(0);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if true matches with one", () => {
        it("returns false for original matcher and true for not().", () => {
            // given
            const testObj: Matcher = strictEqual(true);
            const notTestObj: Matcher = not().strictEqual(true);

            // when
            const result = testObj.match(1);
            const notResult = notTestObj.match(1);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if same strings matches", () => {
        it("returns true for original matcher and false for not().", () => {
            // given
            const testObj: Matcher = strictEqual("5");
            const notTestObj: Matcher = not().strictEqual("5");

            // when
            const result = testObj.match("5");
            const notResult = notTestObj.match("5");

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });
});
