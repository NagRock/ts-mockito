import {mock, instance, when} from '../src/ts-mockito';
import {Foo} from './utils/Foo';

describe('mocking', () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe('calling method', () => {
        describe('with stubbed return value', () => {
            describe('with single param', () => {
                it('returns stubbed value', () => {
                    // given
                    let expectedResult = 'sampleResult';
                    let sampleNumber = 10;
                    when(mockedFoo.convertNumberToString(sampleNumber)).thenReturn(expectedResult);

                    // when
                    let result = foo.convertNumberToString(sampleNumber);

                    // then
                    expect(result).toEqual(expectedResult);
                });
            });

            describe('with two params', () => {
                it('returns stubbed value if two params matches', () => {
                    // given
                    let expectedResult = 999;
                    let firstNumber = 20;
                    let secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    let result = foo.sumTwoNumbers(firstNumber, secondNumber);

                    // then
                    expect(result).toEqual(expectedResult);
                });

                it('returns null if first param doesnt match', () => {
                    // given
                    let expectedResult = 999;
                    let firstNumber = 20;
                    let secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    let result = foo.sumTwoNumbers(123, secondNumber);

                    // then
                    expect(result).toBeNull();
                });

                it('returns null if second param doesnt match', () => {
                    // given
                    let expectedResult = 999;
                    let firstNumber = 20;
                    let secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    let result = foo.sumTwoNumbers(firstNumber, 123);

                    // then
                    expect(result).toBeNull();
                });

                it('returns null if both params doesnt match', () => {
                    // given
                    let expectedResult = 999;
                    let firstNumber = 20;
                    let secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    let result = foo.sumTwoNumbers(123, 321);

                    // then
                    expect(result).toBeNull();
                });
            });
        });

        describe('with stubbed error', () => {
            it('throws given error', () => {
                // given
                let sampleValue = 123;
                let sampleError = new Error('sampleError');
                when(mockedFoo.convertNumberToString(sampleValue)).throwsError(sampleError);

                // when
                let error = null;
                try {
                    foo.convertNumberToString(sampleValue);
                } catch (e) {
                    error = e;
                }

                // then
                expect(error.message).toEqual('sampleError');
            });
        });

        describe('with stubbed function call', () => {
            it('calls given function', () => {
                // given
                let sampleValue = 123;
                let called = false;
                when(mockedFoo.convertNumberToString(sampleValue)).thenCall(() => {
                    called = true;
                });

                // when
                foo.convertNumberToString(sampleValue);

                // then
                expect(called).toBeTruthy();
            });
        });

        describe('with stubbed function call', () => {
            describe('if mocked method is called with different argument', () => {
                it('dont call given function', () => {
                    // given
                    let sampleValue = 123;
                    let called = false;
                    when(mockedFoo.convertNumberToString(sampleValue)).thenCall(() => {
                        called = true;
                    });

                    // when
                    foo.convertNumberToString(999);

                    // then
                    expect(called).toBeFalsy();
                });
            });
        });

        describe('with stubbed function call', () => {
            it('returns value returned by given function', () => {
                // given
                let sampleValue = 123;
                let expectedResult = 'valueFromFunction';
                when(mockedFoo.convertNumberToString(sampleValue)).thenCall(() => {
                    return expectedResult;
                });

                // when
                let result = foo.convertNumberToString(sampleValue);

                // then
                expect(result).toEqual(expectedResult);
            });
        });

        describe('with stubbed function call', () => {
            it('pass arguments to given function', () => {
                // given
                let firstNumber = 5;
                let secondNumber = 10;
                let expectedResult = 50;
                when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenCall((arg1:number, arg2:number) => {
                    return arg1 * arg2;
                });

                // when
                let result = foo.sumTwoNumbers(firstNumber, secondNumber);

                // then
                expect(result).toEqual(expectedResult);
            });
        });
    });
});