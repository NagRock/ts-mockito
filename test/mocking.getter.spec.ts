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
});

class FooWithGetterAndSetter {
    constructor(private dependency: Bar) {
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