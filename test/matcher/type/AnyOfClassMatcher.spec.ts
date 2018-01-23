import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyOfClass} from "../../../src/ts-mockito";

describe("AnyOfClassMatcher", () => {
    let testObj: Matcher;

    class Car {
        constructor() {
        }
    }

    beforeEach(() => {
        testObj = anyOfClass(Car);
    });

    describe("checking if class matches", () => {
        it("returns true", () => {
            const value = new Car();

            // when
            const result = testObj.match(value);
            const notResult = testObj.not().match(value);

            // then
            expect(result).toBeTruthy();
            expect(notResult).toBeFalsy();
        });
    });

    describe("checking if null matches", () => {
        it("returns false", () => {
            const value = null;

            // when
            const result = testObj.match(value);
            const notResult = testObj.not().match(value);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if null matches null", () => {
        it("throws error", () => {
            try {
                anyOfClass(null);
                fail("If you reach this statement, the test failed.");
            } catch (e) {
                expect((e as Error).message).toEqual("The expected class cannot be null.");
            }
        });
    });

    describe("checking if different classes match", () => {
        it("returns false", () => {
            const value = "a string";

            // when
            const result = testObj.match(value);
            const notResult = testObj.not().match(value);

            // then
            expect(result).toBeFalsy();
            expect(notResult).toBeTruthy();
        });
    });

    describe("checking if toString works", () => {
        it("returns 'anyOfClass(Car)'", () => {
            const result = testObj.toString();
            const notResult = testObj.not().toString();

            // then
            expect(result).toEqual("anyOfClass(Car)");
            expect(notResult).toEqual("not().anyOfClass(Car)");
        });
    });
});
