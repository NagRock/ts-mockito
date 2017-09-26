import {capture, reset, spy, when} from "../src/ts-mockito";

describe("spying on a real object", () => {
    class Real {
        foo(a: number) {
            return a;
        }

        bar() {
            return 2;
        }

        get baz() {
            return 3;
        }
    }

    describe("calling a mocked method", () => {
        it("delegates a call to the mock", () => {
            // given
            let foo = new Real();
            let spiedFoo = spy(foo);

            // when
            when(spiedFoo.bar()).thenReturn(3);

            // then
            expect(foo.bar()).toBe(3);
        });
    });

    describe("calling a real method", () => {
        it("executes the instance method", () => {
            // given
            let foo = new Real();

            // when
            spy(foo);

            // then
            expect(foo.bar()).toBe(2);

        });
    });

    describe("calling an object's own method", () => {
        it("delegates a call to the mock", () => {
            // given
            let foo = {
                bar: () => 3
            };
            let spiedFoo = spy(foo);

            // when
            when(spiedFoo.bar()).thenReturn(42);

            // then
            expect(foo.bar()).toBe(42);
        });
    });

    describe("capturing", () => {
        it("captures a call to the real method", () => {
            // given
            let foo = new Real();
            let spiedFoo = spy(foo);

            // when
            foo.bar();

            // then
            expect(capture(spiedFoo.bar).last()).toBeDefined();
        });

        it("captures the call arguments", () => {
            // given
            let foo = new Real();
            let spiedFoo = spy(foo);

            // when
            foo.foo(42);

            // then
            expect(capture<number>(spiedFoo.foo).last()).toEqual([42]);
        });

        it("captures a call to the own property", () => {
            // given
            let foo = {
                bar: (a) => a
            };
            let spiedFoo = spy(foo);

            // when
            foo.bar(42);

            // then
            expect(capture<number>(spiedFoo.bar).last()).toEqual([42]);
        });
    });

    describe("resetting", () => {
        it("restores a call to the real method", () => {
            // given
            let foo = new Real();
            let spiedFoo = spy(foo);

            // when
            when(spiedFoo.bar()).thenReturn(3);
            reset(spiedFoo);

            // then
            expect(foo.bar()).toBe(2);
        });

        it("cleans up not owned property descriptors", () => {
            // given
            let foo = new Real();
            let spiedFoo = spy(foo);

            // when
            when(spiedFoo.baz).thenReturn(42);
            reset(spiedFoo);

            // then
            expect(Object.getOwnPropertyDescriptor(foo, 'baz')).not.toBeDefined();
        });

        it("restores getter properties", () => {
            // given
            let foo = new Real();
            let spiedFoo = spy(foo);

            // when
            when(spiedFoo.baz).thenReturn(42);
            reset(spiedFoo);

            // then
            expect(foo.baz).toBe(3);
        });
    });
});
