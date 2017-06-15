import { AnyOfClassMatcher } from './../../../src/matcher/type/AnyOfClassMatcher';
import { Matcher } from "../../../src/matcher/type/Matcher";
import { anyOfClass } from "../../../src/ts-mockito";

describe('AnyOfClassMatcher', () => {

    class Car {
        constructor() {
        }
    }


    describe('checking if class matches', () => {
        it('returns true', () => {
            // given
            let testObj: Matcher = anyOfClass(Car);
            const value = new Car();

            // when
            const result = testObj.match(value);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe('checking if null matches', () => {
        it('returns false', () => {
            // given
            let testObj: Matcher = anyOfClass(Car);
            const value = null;

            // when
            const result = testObj.match(value);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('checking if null matches null', () => {
        it('throws error', () => {
            try {
                anyOfClass(null);
                fail('If you reach this statement, the test failed.');
            } catch (e) {
                expect((<Error>e).message).toEqual('The expected class cannot be null.');
            }
        });
    });

    describe('checking if different classes match', () => {
        it('returns false', () => {
            // given
            let testObj: Matcher = anyOfClass(Car);
            const value = 'a string';

            // when
            const result = testObj.match(value);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('checking if toString works', () => {
        it('returns \'anyOfClass(Car)\'', () => {
            // given
            let testObj: Matcher = anyOfClass(Car);

            // when
            const result = testObj.toString();

            // then
            expect(result).toEqual('anyOfClass(Car)');
        });
    });
});