import {Matcher} from "../../../src/matcher/type/Matcher";
import {strictEqual} from "../../../src/ts-mockito";

describe("StrictEqualMatcher", () => {
    describe("checking if string representation of number matches with number", () => {
        it("returns false", () => {
            // given
            const testObj: Matcher = strictEqual("5");

            // when
            const result = testObj.match(5);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if false matches with zero", () => {
        it("returns false", () => {
            // given
            const testObj: Matcher = strictEqual(false);

            // when
            const result = testObj.match(0);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if true matches with one", () => {
        it("returns false", () => {
            // given
            const testObj: Matcher = strictEqual(true);

            // when
            const result = testObj.match(1);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if same strings matches", () => {
        it("returns true", () => {
            // given
            const testObj: Matcher = strictEqual("5");

            // when
            const result = testObj.match("5");

            // then
            expect(result).toBeTruthy();
        });
    });
});
