import {MethodToStub} from "../src/MethodToStub";
import {instance, mock, verify, when} from "../src/ts-mockito";

describe("mocking", () => {
    let mockedFoo: FooWithProperties;
    let foo: FooWithProperties;

    if (typeof Proxy === "undefined") {
        pending("Testing browser doesn't support Proxy.");
    }

    describe("mocking object with properties (that don't have getters)", () => {
        it("does create own property descriptors on mock after when is called", () => {
            // given

            // when
            mockedFoo = mock(FooWithProperties);
            when(mockedFoo.sampleNumber).thenReturn(42);

            // then
            expect((mockedFoo.sampleNumber as any).methodStubCollection).toBeDefined();
            expect((mockedFoo.sampleNumber as any).matchers).toBeDefined();
            expect((mockedFoo.sampleNumber as any).mocker).toBeDefined();
            expect((mockedFoo.sampleNumber as any).methodName).toBeDefined();
        });

        it("does create own property descriptors on instance", () => {
            // given
            mockedFoo = mock(FooWithProperties);
            foo = instance(mockedFoo);

            // when
            when(mockedFoo.sampleNumber).thenReturn(42);

            // then
            expect(foo.sampleNumber).toBe(42);
        });

        it("works with verification if property is stubbed", () => {
            // given
            mockedFoo = mock(FooWithProperties);
            foo = instance(mockedFoo);
            when(mockedFoo.sampleNumber).thenReturn(42);

            // when
            const value = foo.sampleNumber;

            // then
            expect(() => verify(mockedFoo.sampleNumber).once()).not.toThrow();
        });

        it("works with verification if property is unstubbed", () => {
            // given
            mockedFoo = mock(FooWithProperties);
            foo = instance(mockedFoo);

            // when
            const value = foo.sampleNumber;

            // then
            expect(() => verify(mockedFoo.sampleNumber).once()).not.toThrow();
        });
    });

});

class FooWithProperties {
    public readonly sampleNumber: number;
}
