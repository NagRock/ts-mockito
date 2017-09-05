import {anyNumber, instance, mock, when} from "../../../src/ts-mockito";
import {Foo} from "../../utils/Foo";

let mockedFoo: Foo;
let foo: Foo;

beforeEach(() => {
    mockedFoo = mock(Foo);
    foo = instance(mockedFoo);
});

describe("anyNumber matcher", () => {
    it("matches positive number", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(3);

        // then
        expect(result).toEqual("expected");
    });

    it("matches negative number", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(-3);

        // then
        expect(result).toEqual("expected");
    });

    it("matches zero number", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(0);

        // then
        expect(result).toEqual("expected");
    });

    it("matches hexadecimal number", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(0x1123);

        // then
        expect(result).toEqual("expected");
    });

    it("matches octal number", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(-0o77);

        // then
        expect(result).toEqual("expected");
    });

    it("matches floating-point number", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(-3.1E+12);

        // then
        expect(result).toEqual("expected");
    });

    it("matches NaN", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(NaN);

        // then
        expect(result).toEqual("expected");
    });

    it("does not match string representation of a number", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("expected");

        // when
        const result = foo.getStringById(<any>"5");

        // then
        expect(result).not.toEqual("expected");
    });

    it("does not match object", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("unexpected");

        // when
        const result = foo.getStringById(<any>{});

        // then
        expect(result).not.toEqual("unexpected");
    });

    it("does not match null", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("unexpected");

        // when
        const result = foo.getStringById(null);

        // then
        expect(result).not.toEqual("unexpected");
    });

    it("does not match boolean", () => {
        // given
        when(mockedFoo.getStringById(anyNumber())).thenReturn("unexpected");

        // when
        const result = foo.getStringById(<any>true);

        // then
        expect(result).not.toEqual("unexpected");
    });
});