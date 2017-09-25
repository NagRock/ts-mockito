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
        it("delegates the call to a mock", () => {
            let foo = new Real();
            let mocked = spy(foo);

            when(mocked.bar()).thenReturn(3);

            expect(foo.bar()).toBe(3);
        });
    });

    describe("calling a real method", () => {
        it("executes the instance method", () => {
            let foo = new Real();

            spy(foo);

            expect(foo.bar()).toBe(2);

        });
    });

    describe("capturing", () => {
        it("captures the call to a real method", () => {
            let foo = new Real();
            let mocked = spy(foo);

            foo.bar();

            expect(capture(mocked.bar).last()).toBeDefined();
        });

        it("captures the call arguments", () => {
            let foo = new Real();
            let mocked = spy(foo);

            foo.foo(42);

            expect(capture(mocked.foo).last()).toEqual([42]);
        });
    });

    describe("resetting", () => {
        it("restores the call to a real method", () => {
            let foo = new Real();
            let mocked = spy(foo);

            when(mocked.bar()).thenReturn(3);
            reset(mocked);

            expect(foo.bar()).toBe(2);
        });

        it("restores property descriptors", () => {
            let foo = new Real();
            let mocked = spy(foo);

            when(mocked.baz).thenReturn(42);
            reset(mocked);

            expect(Object.getOwnPropertyDescriptor(foo, 'baz').get).toBeDefined();
        });
    });
});
