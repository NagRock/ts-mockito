import {mock, instance} from "../src/ts-mockito";
import {Bar} from "./utils/Bar";

describe('mocking', () => {
    let mockedFoo: FooWithGetterAndSetter;
    let foo: FooWithGetterAndSetter;

    describe('mocking object with getters and setters', () => {
        it('does not execute getter or setter code (not throwing null pointer exception)', () => {
            // given

            // when
            mockedFoo = mock(FooWithGetterAndSetter);
            foo = instance(mockedFoo);

            // then

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