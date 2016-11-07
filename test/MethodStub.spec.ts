import {ReturnValueMethodStub} from '../src/stub/ReturnValueMethodStub';
import {strictEqual} from "../src/ts-mockito";

describe('ReturnValueMethodStub', () => {
    describe('checking if given arg is applicable', () => {
        it('returns true when arg match', () => {
            // given
            let testObj: ReturnValueMethodStub = new ReturnValueMethodStub([strictEqual(10)], 50);

            // when
            let result = testObj.isApplicable([10]);

            // then
            expect(result).toBeTruthy();
        });

        it('returns false when arg doesnt match', () => {
            // given
            let testObj: ReturnValueMethodStub = new ReturnValueMethodStub([strictEqual(10)], 50);

            // when
            let result = testObj.isApplicable([999]);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('checking if more than one arg is applicable', () => {
        it('returns true when all matches', () => {
            // given
            let firstValue = 10;
            let secondValue = 20;
            let testObj: ReturnValueMethodStub = new ReturnValueMethodStub([strictEqual(firstValue), strictEqual(secondValue)], 50);

            // when
            let result = testObj.isApplicable([firstValue, secondValue]);

            // then
            expect(result).toBeTruthy();
        });

        it('returns false when first arg doesnt match', () => {
            // given
            let firstValue = 10;
            let secondValue = 20;
            let testObj: ReturnValueMethodStub = new ReturnValueMethodStub([strictEqual(firstValue), strictEqual(secondValue)], 50);

            // when
            let result = testObj.isApplicable([30, secondValue]);

            // then
            expect(result).toBeFalsy();
        });

        it('returns false when second arg doesnt match', () => {
            // given
            let firstValue = 10;
            let secondValue = 20;
            let testObj: ReturnValueMethodStub = new ReturnValueMethodStub([strictEqual(firstValue), strictEqual(secondValue)], 50);

            // when
            let result = testObj.isApplicable([firstValue, 30]);

            // then
            expect(result).toBeFalsy();
        });

        it('returns false when both args doesnt match', () => {
            // given
            let firstValue = 10;
            let secondValue = 20;
            let testObj: ReturnValueMethodStub = new ReturnValueMethodStub([strictEqual(firstValue), strictEqual(secondValue)], 50);

            // when
            let result = testObj.isApplicable([30, 40]);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('getting mocked value', () => {
        it('returns it', () => {
            // given
            let mockedValue = 50;
            let testObj: ReturnValueMethodStub = new ReturnValueMethodStub([], mockedValue);

            // when
            let result = testObj.getValue();

            // then
            expect(result).toEqual(mockedValue);
        });
    });
});