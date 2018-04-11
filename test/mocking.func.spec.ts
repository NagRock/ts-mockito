import {MethodToStub} from "../src/MethodToStub";
import {capture, instance, mock, mockFn, reset, verify, when} from "../src/ts-mockito";

describe("mocking", () => {
    describe("mocking function", () => {
        let mockedFoo;
        let foo;

        it("does create function mock", () => {
            // given

            // when
            mockedFoo = mockFn();

            // then
            expect(mockedFoo() instanceof MethodToStub).toBe(true);
        });

        it("does when", () => {
            // given
            mockedFoo = mockFn();
            foo = instance(mockedFoo);

            // when
            when(mockedFoo("foo")).thenReturn(42);

            // then
            expect(foo("foo")).toBe(42);
        });

        it("does capture", () => {
            // given
            mockedFoo = mockFn();
            foo = instance(mockedFoo);
            foo(42);
            // when
            const [arg] = capture(mockedFoo).last();
            expect(arg).toBe(42);
        });

        it("does verify", () => {
            // given
            mockedFoo = mockFn();
            foo = instance(mockedFoo);
            foo(42);
            verify(mockedFoo(42)).once();
        });

        it("does reset", () => {
            // given
            mockedFoo = mockFn();
            foo = instance(mockedFoo);
            when(mockedFoo("foo")).thenReturn(41);
            reset(mockedFoo);
            expect(foo("foo")).toBe(null);
        });
    });
});
