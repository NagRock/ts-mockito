import {Matcher} from "../../../src/matcher/type/Matcher";
import {between, not} from "../../../src/ts-mockito";

describe("BetweenMatcher", () => {
    describe("checking if value matches given min and max", () => {
        let testObj: Matcher;
        let notTestObj: Matcher;

        beforeEach(() => {
            testObj = between(5, 10);
            notTestObj = not().between(5, 10);
        });

        describe("when given value is lower than min", () => {
            it("returns false for original matcher and true for not().", () => {
                // when
                const result = testObj.isMatching(4);
                const notResult = notTestObj.isMatching(4);

                // then
                expect(result).toBeFalsy();
                expect(notResult).toBeTruthy();
            });
        });

        describe("when given value is equal to min ", () => {
            it("returns true for original matcher and false for not().", () => {
                // when
                const result = testObj.isMatching(5);
                const notResult = notTestObj.isMatching(5);

                // then
                expect(result).toBeTruthy();
                expect(notResult).toBeFalsy();
            });
        });

        describe("when given value is equal grater then min but lower than max", () => {
            it("returns true for original matcher and false for not().", () => {
                // when
                const result = testObj.isMatching(7);
                const notResult = notTestObj.isMatching(7);

                // then
                expect(result).toBeTruthy();
                expect(notResult).toBeFalsy();
            });
        });

        describe("when given value is equal to max", () => {
            it("returns true for original matcher and false for not().", () => {
                // when
                const result = testObj.isMatching(10);
                const notResult = notTestObj.isMatching(10);

                // then
                expect(result).toBeTruthy();
                expect(notResult).toBeFalsy();
            });
        });

        describe("when given value is greater than max", () => {
            it("returns true for original matcher and false for not().", () => {
                // when
                const result = testObj.isMatching(11);
                const notResult = notTestObj.isMatching(11);

                // then
                expect(result).toBeFalsy();
                expect(notResult).toBeTruthy();
            });
        });
    });

    describe("when given min is greater than max", () => {
        it("it throws error", () => {
            // when
            let error = null;
            try {
                between(10, 9);
            } catch (e) {
                error = e;
            }

            // then
            expect(error).not.toBeNull();
        });
    });
});
