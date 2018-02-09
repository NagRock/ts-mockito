import {Matcher} from "../../../src/matcher/type/Matcher";
import {not, objectContaining} from "../../../src/ts-mockito";

describe("ObjectContainingMatcher", () => {
    describe("checking if source object contains given object", () => {
        const testObj: Matcher = objectContaining({b: {c: "c", d: {}}});
        const notTestObj: Matcher = not().objectContaining({b: {c: "c", d: {}}});

        describe("when given value contains given object", () => {
            it("returns true for original matcher and false for not().", () => {
                // when
                const result = testObj.isMatching({a: "a", b: {c: "c", d: {}}});
                const notResult = notTestObj.isMatching({a: "a", b: {c: "c", d: {}}});

                // then
                expect(result).toBeTruthy();
                expect(notResult).toBeFalsy();
            });

            it("returns true for original matcher and false for not().", () => {
                // when
                const result = testObj.isMatching({b: {c: "c", d: {}}});
                const notResult = notTestObj.isMatching({b: {c: "c", d: {}}});

                // then
                expect(result).toBeTruthy();
                expect(notResult).toBeFalsy();
            });
        });

        describe("when given value doesn't contain given object", () => {
            it("returns false for original matcher and true for not().", () => {
                // when
                const result = testObj.isMatching({b: {c: "c"}});
                const notResult = notTestObj.isMatching({b: {c: "c"}});

                // then
                expect(result).toBeFalsy();
                expect(notResult).toBeTruthy();
            });
        });
    });

});
