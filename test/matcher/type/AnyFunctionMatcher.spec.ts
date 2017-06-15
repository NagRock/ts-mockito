import { AnyFunctionMatcher } from './../../../src/matcher/type/AnyFunctionMatcher';
import { Matcher } from "../../../src/matcher/type/Matcher";
import { anyFunction } from "../../../src/ts-mockito";

describe('AnyFunctionMatcher', () => {

    describe('checking if function is function', () => {
        it('returns true', () => {
            // given
            let testObj: Matcher = anyFunction();

            // when
            const result = testObj.match(() => 'arbitrary return value');

            // then
            expect(result).toBeTruthy();
        });
    });

    describe('checking if string is function', () => {
        it('returns false', () => {
            // given
            let testObj: Matcher = anyFunction();

            // when
            const result = testObj.match('some string');

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('checking if number is function', () => {
        it('returns false', () => {
            // given
            let testObj: Matcher = anyFunction();

            // when
            const result = testObj.match(5);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('checking if object is function', () => {
        it('returns false', () => {
            // given
            let testObj: Matcher = anyFunction();

            // when
            const result = testObj.match({prop1: 'prop1Value'});

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('checking if toString works', () => {
        it('returns \'anyFunction()\'', () => {
            // given
            let testObj: Matcher = anyFunction();

            // when
            const result = testObj.toString();

            // then
            expect(result).toEqual('anyFunction()');
        });
    });

});