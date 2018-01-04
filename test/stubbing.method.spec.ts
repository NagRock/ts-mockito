import {anything, instance, mock, when} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("mocking", () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe("calling method", () => {
        describe("with stubbed return value", () => {
            describe("without params", () => {
                it("returns stubbed value", () => {
                    // given
                    const expectedResult = "fake result";
                    when(mockedFoo.getBar()).thenReturn(expectedResult);

                    // when
                    const result = foo.getBar();

                    // then
                    expect(result).toEqual(expectedResult);
                });
            });

            describe("with single param", () => {
                it("returns stubbed value", () => {
                    // given
                    const expectedResult = "sampleResult";
                    const sampleNumber = 10;
                    when(mockedFoo.convertNumberToString(sampleNumber)).thenReturn(expectedResult);

                    // when
                    const result = foo.convertNumberToString(sampleNumber);

                    // then
                    expect(result).toEqual(expectedResult);
                });
            });

            describe("with two params", () => {
                it("returns stubbed value if two params matches", () => {
                    // given
                    const expectedResult = 999;
                    const firstNumber = 20;
                    const secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    const result = foo.sumTwoNumbers(firstNumber, secondNumber);

                    // then
                    expect(result).toEqual(expectedResult);
                });

                it("returns null if first param doesn't match", () => {
                    // given
                    const expectedResult = 999;
                    const firstNumber = 20;
                    const secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    const result = foo.sumTwoNumbers(123, secondNumber);

                    // then
                    expect(result).toBeNull();
                });

                it("returns null if second param doesn't match", () => {
                    // given
                    const expectedResult = 999;
                    const firstNumber = 20;
                    const secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    const result = foo.sumTwoNumbers(firstNumber, 123);

                    // then
                    expect(result).toBeNull();
                });

                it("returns null if both params doesn't match", () => {
                    // given
                    const expectedResult = 999;
                    const firstNumber = 20;
                    const secondNumber = 30;
                    when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenReturn(expectedResult);

                    // when
                    const result = foo.sumTwoNumbers(123, 321);

                    // then
                    expect(result).toBeNull();
                });
            });

            describe("with optional argument", () => {
                describe("and optional argument is provided", () => {
                    it("returns stubbed value", () => {
                        // given
                        const expectedResult = 999;
                        const firstNumber = 2;
                        const secondNumber = 3;
                        when(mockedFoo.sampleMethodWithOptionalArgument(firstNumber, secondNumber)).thenReturn(expectedResult);

                        // when
                        const result = foo.sampleMethodWithOptionalArgument(firstNumber, secondNumber);

                        // then
                        expect(expectedResult).toEqual(result);
                    });
                });

                describe("and optional argument is not provided", () => {
                    it("returns stubbed value", () => {
                        // given
                        const firstExpectedResult = 999;
                        const secondExpectedResult = 333;
                        const firstNumber = 2;
                        const secondNumber = 3;
                        when(mockedFoo.sampleMethodWithOptionalArgument(firstNumber)).thenReturn(firstExpectedResult);
                        when(mockedFoo.sampleMethodWithOptionalArgument(firstNumber, secondNumber)).thenReturn(secondExpectedResult);

                        // when
                        const firstResult = foo.sampleMethodWithOptionalArgument(firstNumber);
                        const secondResult = foo.sampleMethodWithOptionalArgument(firstNumber, secondNumber);

                        // then
                        expect(firstExpectedResult).toEqual(firstResult);
                        expect(secondExpectedResult).toEqual(secondResult);
                    });
                });
            });
        });

        describe("with stubbed error", () => {
            it("throws given error", () => {
                // given
                const sampleValue = 123;
                const sampleError = new Error("sampleError");
                when(mockedFoo.convertNumberToString(sampleValue)).thenThrow(sampleError);

                // when
                let error = null;
                try {
                    foo.convertNumberToString(sampleValue);
                } catch (e) {
                    error = e;
                }

                // then
                expect(error.message).toEqual("sampleError");
            });
        });

        describe("with stubbed promise resolve", () => {
            it("resolves with given value", done => {
                // given
                const sampleValue = "abc";
                const expectedResult = "def";
                when(mockedFoo.sampleMethodReturningPromise(sampleValue)).thenResolve(expectedResult);

                // when
                foo.sampleMethodReturningPromise(sampleValue)
                    .then(value => {
                        // then
                        expect(value).toEqual(expectedResult);
                        done();
                    })
                    .catch(err => done.fail(err));
            });
        });

        describe("with stubbed promise rejection", () => {
            it("rejects with given error", done => {
                // given
                const sampleValue = "abc";
                const sampleError = new Error("sampleError");
                when(mockedFoo.sampleMethodReturningPromise(sampleValue)).thenReject(sampleError);

                // when
                foo.sampleMethodReturningPromise(sampleValue)
                    .then(value => done.fail())
                    .catch(err => {
                        // then
                        expect(err.message).toEqual("sampleError");
                        done();
                    });
            });
        });

        describe("with stubbed function call", () => {
            it("calls given function", () => {
                // given
                const sampleValue = 123;
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

        describe("with stubbed function call", () => {
            describe("if mocked method is called with different argument", () => {
                it("dont call given function", () => {
                    // given
                    const sampleValue = 123;
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

        describe("with stubbed function call", () => {
            it("returns value returned by given function", () => {
                // given
                const sampleValue = 123;
                const expectedResult = "valueFromFunction";
                when(mockedFoo.convertNumberToString(sampleValue)).thenCall(() => {
                    return expectedResult;
                });

                // when
                const result = foo.convertNumberToString(sampleValue);

                // then
                expect(result).toEqual(expectedResult);
            });
        });

        describe("with stubbed function call", () => {
            it("pass arguments to given function", () => {
                // given
                const firstNumber = 5;
                const secondNumber = 10;
                const expectedResult = 50;
                when(mockedFoo.sumTwoNumbers(firstNumber, secondNumber)).thenCall((arg1: number, arg2: number) => {
                    return arg1 * arg2;
                });

                // when
                const result = foo.sumTwoNumbers(firstNumber, secondNumber);

                // then
                expect(result).toEqual(expectedResult);
            });
        });

        describe("that was found in the constructor code", () => {
            it("returns mocked value", () => {
                // given
                const expectedResult = "fakeValue";
                when(mockedFoo.dynamicMethod(anything())).thenReturn(expectedResult);

                // when
                const result = foo.dynamicMethod("sample matching anything() matcher");

                // then
                expect(result).toEqual(expectedResult);
            });
        });

        describe("that was found in the function code", () => {
            it("returns mocked value", () => {
                // given
                const expectedResult = "fakeValue";
                when(mockedFoo.dynamicMethodInFunction(anything())).thenReturn(expectedResult);

                // when
                const result = foo.dynamicMethodInFunction("sample matching anything() matcher");

                // then
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe("calling method", () => {
        describe("that does not exists", () => {
            it("throws error", () => {
                // given

                // when
                let error = null;
                try {
                    foo["notExistingMethod"]();
                } catch (e) {
                    error = e;
                }

                // then
                expect(error).not.toBeNull();
            });
        });
    });
});
