import {capture, instance, mock} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("capturing method arguments", () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe("when method has been called", () => {
        it("captures all arguments passed to it", () => {
            // given

            // when
            foo.concatStringWithNumber("first", 1);
            foo.concatStringWithNumber("second", 2);
            foo.concatStringWithNumber("third", 3);

            // then
            const [firstCapturedValue, secondCapturedValue] = capture(mockedFoo.concatStringWithNumber).first();
            expect(firstCapturedValue).toEqual("first");
            expect(secondCapturedValue).toEqual(1);
            expect(capture(mockedFoo.concatStringWithNumber).first()).toEqual(["first", 1]);
            expect(capture(mockedFoo.concatStringWithNumber).second()).toEqual(["second", 2]);
            expect(capture(mockedFoo.concatStringWithNumber).third()).toEqual(["third", 3]);
            expect(capture(mockedFoo.concatStringWithNumber).beforeLast()).toEqual(["second", 2]);
            expect(capture(mockedFoo.concatStringWithNumber).last()).toEqual(["third", 3]);
            expect(capture(mockedFoo.concatStringWithNumber).byCallIndex(0)).toEqual(["first", 1]);
            expect(capture(mockedFoo.concatStringWithNumber).byCallIndex(1)).toEqual(["second", 2]);
            expect(capture(mockedFoo.concatStringWithNumber).byCallIndex(2)).toEqual(["third", 3]);
        });
    });

    describe("when method has been called twice", () => {
        describe("but we want check third call arguments", () => {
            it("throws error", () => {
                // given
                foo.concatStringWithNumber("first", 1);
                foo.concatStringWithNumber("second", 2);

                // when
                let error;
                try {
                    capture(mockedFoo.concatStringWithNumber).third();
                } catch (e) {
                    error = e;
                }

                // then
                expect(error.message).toContain("Cannot capture arguments");
            });
        });
    });
});
