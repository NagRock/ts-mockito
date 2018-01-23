import {Matcher} from "../../../src/matcher/type/Matcher";
import {objectContaining} from "../../../src/ts-mockito";

describe("ObjectContainingMatcher", () => {
    describe("checking if source object contains given object", () => {
        const testObj: Matcher = objectContaining({b: {c: "c", d: {}}});

        describe("when given value contains given object", () => {
            it("returns true", () => {
                // when
                const result = testObj.match({a: "a", b: {c: "c", d: {}}});

                // then
                expect(result).toBeTruthy();
            });

            it("returns true", () => {
                // when
                const result = testObj.match({b: {c: "c", d: {}}});

                // then
                expect(result).toBeTruthy();
            });
        });

        describe("when given value doesn't contain given object", () => {
            it("returns false", () => {
                // when
                const result = testObj.match({b: {c: "c"}});

                // then
                expect(result).toBeFalsy();
            });
        });
    });

});
