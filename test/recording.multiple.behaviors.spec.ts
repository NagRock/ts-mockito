import {instance, mock, when} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("recording multiple behaviors", () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe("when more than one behavior matches", () => {
        it("using added later", () => {
            // given
            const sampleValue = 3;
            const firstStubResult = "first";
            const secondStubResult = "second";
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstStubResult);
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(secondStubResult);

            // when
            const firstCallResult = foo.convertNumberToString(sampleValue);
            const secondCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(secondStubResult);
            expect(secondCallResult).toEqual(secondStubResult);
        });
    });

    describe("when one of behaviors doesn't match", () => {
        it("is skipped", () => {
            // given
            const sampleValue = 3;
            const firstMatchingStubResult = "first";
            const secondMatchingStubResult = "second";
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstMatchingStubResult);
            when(mockedFoo.convertNumberToString(123)).thenReturn("not matching behavior");
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(secondMatchingStubResult);

            // when
            const firstCallResult = foo.convertNumberToString(sampleValue);
            const secondCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(secondMatchingStubResult);
            expect(secondCallResult).toEqual(secondMatchingStubResult);
        });
    });

    describe("when calling same method multiple times", () => {
        describe("used behaviors are removed", () => {
            describe("and when no more than one matcher left", () => {
                it("repeats last one", () => {
                    // given
                    const sampleValue = 3;
                    const firstMatchingStubResult = "first";
                    const secondMatchingStubResult = "second";
                    when(mockedFoo.convertNumberToString(sampleValue))
                        .thenReturn(firstMatchingStubResult)
                        .thenReturn(secondMatchingStubResult);

                    // when
                    const firstCallResult = foo.convertNumberToString(sampleValue);
                    const secondCallResult = foo.convertNumberToString(sampleValue);
                    const thirdCallResult = foo.convertNumberToString(sampleValue);
                    const fourthCallResult = foo.convertNumberToString(sampleValue);
                    const fifthCallResult = foo.convertNumberToString(sampleValue);

                    // then
                    expect(firstCallResult).toEqual(firstMatchingStubResult);
                    expect(secondCallResult).toEqual(secondMatchingStubResult);
                    expect(thirdCallResult).toEqual(secondMatchingStubResult);
                    expect(fourthCallResult).toEqual(secondMatchingStubResult);
                    expect(fifthCallResult).toEqual(secondMatchingStubResult);
                });
            });
        });
    });

    describe("when multiple results has been set by one method call", () => {
        it("uses one by another and repeat last one infinitely", () => {
            // given
            const sampleValue = 3;
            const firstMatchingStubResult = "first";
            const secondMatchingStubResult = "second";
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstMatchingStubResult, secondMatchingStubResult);

            // when
            const firstCallResult = foo.convertNumberToString(sampleValue);
            const secondCallResult = foo.convertNumberToString(sampleValue);
            const thirdCallResult = foo.convertNumberToString(sampleValue);
            const fourthCallResult = foo.convertNumberToString(sampleValue);
            const fifthCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(firstMatchingStubResult);
            expect(secondCallResult).toEqual(secondMatchingStubResult);
            expect(thirdCallResult).toEqual(secondMatchingStubResult);
            expect(fourthCallResult).toEqual(secondMatchingStubResult);
            expect(fifthCallResult).toEqual(secondMatchingStubResult);
        });
    });

    describe("when return values are mixed with throw errors", () => {
        it("uses one by one and repeat last one infinitely", () => {
            // given
            const sampleValue = 3;
            const firstMatchingStubResult = "first";
            const secondMatchingStubResult = "second";
            const firstMatchingError = new Error("firstError");
            when(mockedFoo.convertNumberToString(sampleValue))
                .thenReturn(firstMatchingStubResult)
                .thenThrow(firstMatchingError)
                .thenReturn(secondMatchingStubResult);

            // when
            const firstCallResult = foo.convertNumberToString(sampleValue);
            let error: Error;
            try {
                foo.convertNumberToString(sampleValue);
            } catch (e) {
                error = e;
            }
            const thirdCallResult = foo.convertNumberToString(sampleValue);
            const fourthCallResult = foo.convertNumberToString(sampleValue);
            const fifthCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(firstMatchingStubResult);
            expect(error.message).toEqual(firstMatchingError.message);
            expect(thirdCallResult).toEqual(secondMatchingStubResult);
            expect(fourthCallResult).toEqual(secondMatchingStubResult);
            expect(fifthCallResult).toEqual(secondMatchingStubResult);
        });
    });

    describe("when just one behavior was set", () => {
        it("behavior is not removed", () => {
            // given
            const sampleValue = 3;
            const firstCallExpectedResult = "first";
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstCallExpectedResult);

            // when
            const firstCallResult = foo.convertNumberToString(sampleValue);
            const secondCallResult = foo.convertNumberToString(sampleValue);
            const thirdCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(firstCallExpectedResult);
            expect(secondCallResult).toEqual(firstCallExpectedResult);
            expect(thirdCallResult).toEqual(firstCallExpectedResult);
        });
    });
});
