import {MethodToStub} from "../src/MethodToStub";
import {instance, mock, when} from "../src/ts-mockito";
import {Bar} from "./utils/Bar";

describe("mocking", () => {
    let mockedFoo: FooWithGetterAndSetter;
    let foo: FooWithGetterAndSetter;

    describe("mocking object with getters and setters", () => {
        it("does not execute getter or setter code (not throwing null pointer exception)", () => {
            // given

            // when
            mockedFoo = mock(FooWithGetterAndSetter);
            foo = instance(mockedFoo);

            // then

        });

        it("does create own property descriptors on mock", () => {
            // given

            // when
            mockedFoo = mock(FooWithGetterAndSetter);

            // then
            expect((mockedFoo.twoPlusTwo as any) instanceof MethodToStub).toBe(true);
        });

        it("does create own property descriptors on instance", () => {
            // given
            mockedFoo = mock(FooWithGetterAndSetter);
            foo = instance(mockedFoo);

            // when
            when(mockedFoo.twoPlusTwo).thenReturn(42);

            // then
            expect(foo.twoPlusTwo).toBe(42);
        });

        it("does create inherited property descriptors on mock", () => {
            // given
            mockedFoo = mock(FooWithGetterAndSetter);
            foo = instance(mockedFoo);

            // when

            // then
            expect((mockedFoo.sampleString as any) instanceof MethodToStub).toBe(true);
        });

        it("does create inherited property descriptors on instance", () => {
            // given
            mockedFoo = mock(FooWithGetterAndSetter);
            foo = instance(mockedFoo);

            // when
            when(mockedFoo.sampleString).thenReturn("42");

            // then
            expect(foo.sampleString).toBe("42");
        });
    });

    describe("mocking object that extends abstract class", () => {
        it("does not throw null pointer when reading descriptor", () => {
            // given

            // when
            mockedFoo = mock(FooWithGetterAndSetter);
            foo = instance(mockedFoo);

            // then
        });
    });
});

abstract class SampleAbstractClass {
    public get sampleString(): string {
        return "sampleString";
    }
}

class FooWithGetterAndSetter extends SampleAbstractClass {
    constructor(private dependency: Bar) {
        super();
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
