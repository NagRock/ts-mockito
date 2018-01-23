import {instance, mock} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("instance", () => {
    describe("getting instance of mock", () => {
        let mockedFoo: Foo;

        it("returns always same instance", () => {
            // given
            mockedFoo = mock(Foo);

            // when
            const firstFooInstance = instance(mockedFoo);
            const secondFooInstance = instance(mockedFoo);

            // then
            expect(firstFooInstance).toBe(secondFooInstance);
        });
    });
});
