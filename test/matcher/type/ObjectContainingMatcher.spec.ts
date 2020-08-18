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
            describe("when given value is an object", () => {
                it("returns false", () => {
                    // when
                    const result = testObj.match({b: {c: "c"}});

                    // then
                    expect(result).toBeFalsy();
                });

                it("represents the object as a json string", () => {
                    // when
                    const result = testObj.toString();

                    // then
                    expect(result).toContain(`objectContaining({"b":{"c":"c","d":{}}`);
                });
            });

            describe("when given value is a scalar", () => {
                const testCases = [
                    { scalar: 123, expected: 123 },
                    { scalar: 123.456, expected: 123.456 },
                    { scalar: "a", expected: '"a"' },
                ];

                testCases.forEach(test => {
                    it(`represents the scalar value '${test.scalar}' as string`, () => {
                        // when
                        const testValue: Matcher = objectContaining(test.scalar);
                        const result = testValue.toString();

                        // then
                        expect(result).toContain(`objectContaining(${test.expected})`);
                    });

                    it("returns false", () => {
                        // when
                        const result = testObj.match(test.scalar);

                        // then
                        expect(result).toBeFalsy();
                    });
                });
            });
        });
    });

});
