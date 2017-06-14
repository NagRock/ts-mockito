import {mock, instance, fields} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("mocking", () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe("mocking single fields", () => {
        it("sets the value of the field", () => {
            // given
            // when
            fields(mockedFoo).setValue("bar", 42);

            // then
            expect(foo.bar).toBe(42);
        });

        it("overrides previous set values", () => {
            // given
            fields(mockedFoo).setValue("bar", 42);
            
            // when
            fields(mockedFoo).setValue("bar", 23);

            // then
            expect(foo.bar).toBe(23);
        });
    });

    describe("mocking multiple fields", () => {
        it("sets all values correctly", () => {
            // given
            const date = new Date();

            // when
            fields(mockedFoo).setValues({
                "bar": 42,
                "baz": "Test",
                "qoo": date
            });

            // then
            expect(foo.bar).toBe(42);
            expect(foo.baz).toBe("Test");
            expect(foo.qoo).toBe(date);
        });

        it("sets partial values correctly", () => {
            // given
            // when
            fields(mockedFoo).setValues({ "baz": "Test" });

            // then
            expect(foo.baz).toBe("Test");
        });

        it("overrides previous set values", () => {
            // given
            fields(mockedFoo).setValues({
                "bar": 42,
                "baz": "Test",
                "qoo": new Date()
            });

            // when
            fields(mockedFoo).setValues({
                "bar": 23,
                "qoo": null
            });

            // then
            expect(foo.bar).toBe(23);
            expect(foo.baz).toBe("Test");
            expect(foo.qoo).toBe(null);
        });
    });
});