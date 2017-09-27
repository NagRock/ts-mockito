import {anything, instance, mock, resetCalls, verify} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("resetting mocked object", () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe("when method has been called once", () => {
        describe("but later stub has been reset", () => {
            it("shows that never been called", () => {
                // given
                foo.getBar();
                verify(mockedFoo.getBar()).once();

                // when
                resetCalls(mockedFoo);

                // then
                verify(mockedFoo.getBar()).never();
            });
        });
    });

    describe("when method has been called thrice", () => {
        describe("but later stub has been reset", () => {
            it("shows that never been called", () => {
                // given
                foo.getBar();
                foo.getBar();
                foo.getBar();
                verify(mockedFoo.getBar()).thrice();

                // when
                resetCalls(mockedFoo);

                // then
                verify(mockedFoo.getBar()).never();
            });
        });
    });

    describe("when method has been called with arguments twice", () => {
        describe("but later stub has been reset", () => {
            it("shows that never been called", () => {
                // given
                foo.sumTwoNumbers(2, 3);
                foo.sumTwoNumbers(2, 3);
                verify(mockedFoo.sumTwoNumbers(2, 3)).twice();

                // when
                resetCalls(mockedFoo);

                // then
                verify(mockedFoo.sumTwoNumbers(2, 3)).never();
                verify(mockedFoo.sumTwoNumbers(anything(), anything())).never();
            });
        });
    });

    describe("when two different methods has been called twice", () => {
        describe("but later stub has been reset", () => {
            it("shows that never been called", () => {
                // given
                foo.getBar();
                foo.getBar();
                foo.sumTwoNumbers(2, 3);
                foo.sumTwoNumbers(2, 3);
                verify(mockedFoo.getBar()).twice();
                verify(mockedFoo.sumTwoNumbers(2, 3)).twice();

                // when
                resetCalls(mockedFoo);

                // then
                verify(mockedFoo.getBar()).never();
                verify(mockedFoo.sumTwoNumbers(2, 3)).never();
                verify(mockedFoo.sumTwoNumbers(anything(), anything())).never();
            });
        });
    });

    describe("when two different methods has been called", () => {
        describe("but later stub has been reset", () => {
            it("throws exception with information that methods has not been called", () => {
                // given
                foo.getBar();
                foo.sumTwoNumbers(2, 3);
                verify(mockedFoo.getBar()).calledBefore(mockedFoo.sumTwoNumbers(2, 3));

                // when
                resetCalls(mockedFoo);

                // then
                try {
                    verify(mockedFoo.getBar()).calledBefore(mockedFoo.sumTwoNumbers(2, 3));
                    fail();
                } catch (e) {
                    expect(e.message).toContain("to be called before");
                    expect(e.message).toContain("but none of them has been called");
                }
            });
        });
    });

    describe("when two different methods has been after", () => {
        describe("but later stub has been reset", () => {
            it("throws exception with information that methods has not been called", () => {
                // given
                foo.getBar();
                foo.sumTwoNumbers(2, 3);
                verify(mockedFoo.sumTwoNumbers(2, 3)).calledAfter(mockedFoo.getBar());

                // when
                resetCalls(mockedFoo);

                // then
                try {
                    verify(mockedFoo.sumTwoNumbers(2, 3)).calledAfter(mockedFoo.getBar());
                    fail();
                } catch (e) {
                    expect(e.message).toContain("to be called after");
                    expect(e.message).toContain("but none of them has been called");
                }
            });
        });
    });
});
