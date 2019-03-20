import {MethodToStub} from "../src/MethodToStub";
import {imock, instance, mock, MockPropertyPolicy, verify, when} from "../src/ts-mockito";
import {Bar} from "./utils/Bar";

describe("mocking", () => {
    describe("mocking abstract class", () => {
        let mockedFoo: SampleAbstractClass;
        let foo: SampleAbstractClass;

        it("does not execute getter or setter code (not throwing null pointer exception)", () => {
            // given

            // when
            mockedFoo = mock(SampleAbstractClass);
            foo = instance(mockedFoo);

            // then

        });

        it("does create own property descriptors on mock", () => {
            // given

            // when
            mockedFoo = mock(SampleAbstractClass);

            // then
            expect((mockedFoo.twoPlusTwo as any) instanceof MethodToStub).toBe(true);
        });

        it("does create own property descriptors on instance", () => {
            // given
            mockedFoo = mock(SampleAbstractClass);
            foo = instance(mockedFoo);

            // when
            when(mockedFoo.twoPlusTwo).thenReturn(42);

            // then
            expect(foo.twoPlusTwo).toBe(42);
        });

        it("does create inherited property descriptors on mock", () => {
            // given
            mockedFoo = mock(SampleAbstractClass);
            foo = instance(mockedFoo);

            // when

            // then
            expect((mockedFoo.sampleString as any) instanceof MethodToStub).toBe(true);
        });

        it("does create inherited property descriptors on instance", () => {
            // given
            mockedFoo = mock(SampleAbstractClass);
            foo = instance(mockedFoo);

            // when
            when(mockedFoo.sampleString).thenReturn("42");

            // then
            expect(foo.sampleString).toBe("42");
        });
    });

    describe("mocking class with hasOwnProperty", () => {
        let mockedFoo: SampleClassWithHasOwnProperty;

        it("does not attempt to mock hasOwnProperty (which would throw)", () => {
            // given

            // when
            mockedFoo = mock(SampleClassWithHasOwnProperty);

            // then

        });
    });

    describe("mocking generic class", () => {
        let mockedFoo: SampleGeneric<SampleInterface>;
        let foo: SampleGeneric<SampleInterface>;

        it("does not execute getter or setter code (not throwing null pointer exception)", () => {
            // given

            // when
            mockedFoo = mock(SampleGeneric);
            foo = instance(mockedFoo);

            // then

        });

        it("does create own property descriptors on mock", () => {
            // given

            // when
            mockedFoo = mock(SampleGeneric);

            // then
            expect((mockedFoo.twoPlusTwo as any) instanceof MethodToStub).toBe(true);
        });

        it("allows to mock method with generic return type value (with IDE completion)", () => {
            // given
            mockedFoo = mock(SampleGeneric);
            foo = instance(mockedFoo);
            const expectedResult = new SampleInterfaceImplementation();
            when(mockedFoo.getGenericTypedValue()).thenReturn(expectedResult);

            // when
            const result = foo.getGenericTypedValue();

            // then
            expect(result).toEqual(expectedResult);
        });

        it("does create own property descriptors on instance", () => {
            // given
            mockedFoo = mock(SampleGeneric);
            foo = instance(mockedFoo);

            // when
            when(mockedFoo.twoPlusTwo).thenReturn(42);

            // then
            expect(foo.twoPlusTwo).toBe(42);
        });

        it("does create inherited property descriptors on mock", () => {
            // given
            mockedFoo = mock(SampleGeneric);
            foo = instance(mockedFoo);

            // when

            // then
            expect((mockedFoo.sampleString as any) instanceof MethodToStub).toBe(true);
        });

        it("does create inherited property descriptors on instance", () => {
            // given
            mockedFoo = mock(SampleGeneric);
            foo = instance(mockedFoo);

            // when
            when(mockedFoo.sampleString).thenReturn("42");

            // then
            expect(foo.sampleString).toBe("42");
        });
    });

    describe("mocking object which doesn't inherit from anything", () => {
        it("does not execute getter or setter code (not throwing null pointer exception)", () => {
            // given
            const bareObject = Object.create(null);

            // when
            const mockedObject = mock(bareObject);
            instance(mockedObject);

            // then

        });
    });

    describe("mocking an interface with methods", () => {
        let mockedFoo: SampleInterface;
        let foo: SampleInterface;

        if (typeof Proxy === "undefined") {
            it("throws when creating interface mock", () => {
                // given

                // when

                // then
                expect(() => imock()).toThrow();
            });
        }

        if (typeof Proxy !== "undefined") {

            it("can create interface mock", () => {
                // given

                // when
                mockedFoo = imock();
                foo = instance(mockedFoo);

                // then
            });

            it("can verify call count", () => {
                // given
                mockedFoo = imock();
                foo = instance(mockedFoo);

                // when
                const result = foo.sampleMethod();

                // then
                verify(mockedFoo.sampleMethod()).called();
                expect(result).toBe(null);
            });

            it("can setup call actions", () => {
                // given
                mockedFoo = imock();
                foo = instance(mockedFoo);
                when(mockedFoo.sampleMethod()).thenReturn(5);

                // when
                const result = foo.sampleMethod();

                // then
                verify(mockedFoo.sampleMethod()).called();
                expect(result).toBe(5);
            });

            it("can return default value from actions with no setup", () => {
                // given
                mockedFoo = imock();
                foo = instance(mockedFoo);

                // when
                const result = foo.sampleMethod();

                // then
                verify(mockedFoo.sampleMethod()).called();
                expect(result).toBe(null);
            });
        }
    });

    describe("mock an interface with properties", () => {
        let mockedFoo: SampleInterface;
        let foo: SampleInterface;

        if (typeof Proxy !== "undefined") {
            it("can setup call actions", () => {
                // given
                mockedFoo = imock(MockPropertyPolicy.StubAsProperty);
                foo = instance(mockedFoo);
                when(mockedFoo.sampleProperty).thenReturn("value");

                // when
                const result = foo.sampleProperty;

                // then
                verify(mockedFoo.sampleProperty).called();
                expect(result).toBe("value");
            });

            it("can return default value from actions with no setup", () => {
                // given
                mockedFoo = imock(MockPropertyPolicy.StubAsProperty);
                foo = instance(mockedFoo);

                // when
                const result = foo.sampleProperty;

                // then
                verify(mockedFoo.sampleProperty).called();
                expect(result).toBe(null);
            });
        }
    });

    describe("mock an interface with default policy to throw", () => {
        let mockedFoo: SampleInterface;
        let foo: SampleInterface;

        if (typeof Proxy !== "undefined") {
            it("can setup call actions", () => {
                // given
                mockedFoo = imock(MockPropertyPolicy.Throw);
                foo = instance(mockedFoo);
                when(mockedFoo.sampleProperty).thenReturn("value");

                // when
                const result = foo.sampleProperty;

                // then
                verify(mockedFoo.sampleProperty).called();
                expect(result).toBe("value");
            });

            it("can throw from actions with no setup", () => {
                // given
                mockedFoo = imock(MockPropertyPolicy.Throw);
                foo = instance(mockedFoo);

                // when
                expect(() => foo.sampleProperty).toThrow();

                // then
            });
        }
    });

    describe("mock an interface with both properties and methods", () => {
        let mockedFoo: SampleInterface;
        let foo: SampleInterface;

        if (typeof Proxy !== "undefined") {
            it("can setup call actions on methods", () => {
                // given
                mockedFoo = imock(MockPropertyPolicy.StubAsProperty);
                foo = instance(mockedFoo);
                when(mockedFoo.sampleMethod()).thenReturn(5);

                // when
                const result = foo.sampleMethod();

                // then
                verify(mockedFoo.sampleMethod()).called();
                expect(result).toBe(5);
            });
        }
    });
});

abstract class SampleAbstractClass {
    public dependency: Bar;

    public get sampleString(): string {
        return "sampleString";
    }

    public sampleMethod(): number {
        return 4;
    }

    public get twoPlusTwo(): number {
        return this.dependency.sumTwoNumbers(2, 2);
    }

    public set twoPlusTwo(value: number) {
        this.dependency.sumTwoNumbers(value, 0);
    }
}

class SampleClassWithHasOwnProperty {
    public hasOwnProperty(name: string): boolean {
        return Object.prototype.hasOwnProperty.call(this, name);
    }
}

interface SampleInterface {
    dependency: Bar;

    sampleProperty: string;

    sampleMethod(): number;
}

class SampleInterfaceImplementation implements SampleInterface {
    public dependency: Bar;

    public sampleProperty: "999";

    public sampleMethod(): number {
        return 999;
    }
}

class SampleGeneric<T> {
    public dependency: Bar;

    public get sampleString(): string {
        return "sampleString";
    }

    public sampleMethod(): number {
        return 4;
    }

    public get twoPlusTwo(): number {
        return this.dependency.sumTwoNumbers(2, 2);
    }

    public set twoPlusTwo(value: number) {
        this.dependency.sumTwoNumbers(value, 0);
    }

    public getGenericTypedValue(): T {
        return null;
    }
}
