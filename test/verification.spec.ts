import {Foo} from './utils/Foo';
import {mock, instance, verify} from '../src/ts-mockito';

describe('verifying mocked object', () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe('when no calls are expected', () => {
        describe('and no one occurred', () => {
            it('doesnt throw error', () => {
                // given
                let sampleValue = 3;

                // when
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).never();
                } catch (e) {
                    fail('Expected method to be called just once');
                }
            });
        });

        describe('and one occurred but with different argument', () => {
            it('doesnt throw error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue + 321);

                // when
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).never();
                } catch (e) {
                    fail('Expected method to be called just once');
                }
            });
        });

        describe('and one occurred', () => {
            it('throws error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);

                // when
                let error;
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).never();
                } catch (e) {
                    error = e;
                }

                //then
                verifyErrorMessage(error, 0, 1);
            });
        });
    });

    describe('when one call is expected', () => {
        describe('and just one occurred', () => {
            it('doesnt throw error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);

                // when
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).called();
                    verify(mockedFoo.convertNumberToString(sampleValue)).once();
                    verify(mockedFoo.convertNumberToString(sampleValue)).times(1);
                    verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(1);
                    verify(mockedFoo.convertNumberToString(sampleValue)).atMost(1);
                } catch (e) {
                    fail('Expected method to be called just once');
                }
            });
        });

        describe('but two has occurred', () => {
            it('throws error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);

                // when
                let error;
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).once();
                } catch (e) {
                    error = e;
                }

                //then
                verifyErrorMessage(error, 1, 2);
            });
        });
    });

    describe('when two calls are expected', () => {
        describe('and just two occurred', () => {
            it('doesnt throw error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);

                // when
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).called();
                    verify(mockedFoo.convertNumberToString(sampleValue)).twice();
                    verify(mockedFoo.convertNumberToString(sampleValue)).times(2);
                    verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(2);
                    verify(mockedFoo.convertNumberToString(sampleValue)).atMost(2);
                } catch (e) {
                    fail('Expected method to be called twice');
                }
            });
        });

        describe('but just one has occurred', () => {
            it('throws error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);

                // when
                let error;
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).twice();
                } catch (e) {
                    error = e;
                }

                //then
                verifyErrorMessage(error, 2, 1);
            });
        });
    });

    describe('when three calls are expected', () => {
        describe('and just three occurred', () => {
            it('doesnt throw error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);

                // when
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).called();
                    verify(mockedFoo.convertNumberToString(sampleValue)).thrice();
                    verify(mockedFoo.convertNumberToString(sampleValue)).times(3);
                    verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(3);
                    verify(mockedFoo.convertNumberToString(sampleValue)).atMost(3);
                } catch (e) {
                    fail('Expected method to be called thrice');
                }
            });
        });

        describe('but four has occurred', () => {
            it('throws error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);

                // when
                let error;
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).thrice();
                } catch (e) {
                    error = e;
                }

                //then
                verifyErrorMessage(error, 3, 4);
            });
        });
    });

    describe('when at least two calls are expected', () => {
        describe('but three has occurred', () => {
            it('doesnt throw error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);

                // when
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(2);
                } catch (e) {
                    fail('Expected method to be called at least two times');
                }
            });
        });

        describe('but just one occurred', () => {
            it('throws error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);

                // when
                let error;
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).atLeast(2);
                } catch (e) {
                    error = e;
                }

                //then
                verifyErrorMessage(error, 2, 1);
            });
        });
    });

    describe('when at most two calls are expected', () => {
        describe('but one has occurred', () => {
            it('doesnt throw error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);

                // when
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).atMost(2);
                } catch (e) {
                    fail('Expected method to be called at most two times');
                }
            });
        });

        describe('but just three occurred', () => {
            it('throws error', () => {
                // given
                let sampleValue = 3;
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);
                foo.convertNumberToString(sampleValue);

                // when
                let error;
                try {
                    verify(mockedFoo.convertNumberToString(sampleValue)).atMost(2);
                } catch (e) {
                    error = e;
                }

                //then
                verifyErrorMessage(error, 2, 3);
            });
        });
    });
});

function verifyErrorMessage(error, expectedCallCount, receivedCallCount): void {
    expect(error.message).toContain(expectedCallCount + ' time(s). But');
    expect(error.message).toContain('has been called ' + receivedCallCount + ' time(s)');
}