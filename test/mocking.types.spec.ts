import {MethodToStub} from "../src/MethodToStub";
import {instance, mock, when} from "../src/ts-mockito";
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
            expect(<any>mockedFoo.twoPlusTwo instanceof MethodToStub).toBe(true);
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
            expect(<any>mockedFoo.sampleString instanceof MethodToStub).toBe(true);
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
            expect(<any>mockedFoo.twoPlusTwo instanceof MethodToStub).toBe(true);
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
            expect(expectedResult).toEqual(result);
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
            expect(<any>mockedFoo.sampleString instanceof MethodToStub).toBe(true);
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
});

abstract class SampleAbstractClass {
    dependency: Bar;

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

interface SampleInterface {
    dependency: Bar;

    sampleMethod(): number;
}

class SampleInterfaceImplementation implements SampleInterface {
    dependency: Bar;

    public sampleMethod(): number {
        return 999;
    }
}

class SampleGeneric<T> {
    dependency: Bar;

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