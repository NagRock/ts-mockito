import {instance, mock} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("instance", () => {
    describe("getting instance of mock", () => {
        let mockedFoo: Foo;

        it("returns always same instance", () => {
            // given
            mockedFoo = mock(Foo);

            // when
            let firstFooInstance = instance(mockedFoo);
            let secondFooInstance = instance(mockedFoo);

            // then
            expect(firstFooInstance).toBe(secondFooInstance);
        });
    });
});
