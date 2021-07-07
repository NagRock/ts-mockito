import { instance, mock, when } from "../src/ts-mockito";
import { FooInterface } from "./utils/FooInterface";
import { ThenableInterface } from "./utils/Thenable";

describe("Interface", () => {
  if (typeof Proxy === "undefined") {
    pending("Testing browser doesn't support Proxy.");
  }

  describe("Basic", () => {
    let mockedFoo: FooInterface;
    let foo: FooInterface;

    beforeEach(() => {
      mockedFoo = mock<FooInterface>();
      foo = instance(mockedFoo);
    });

    it("should mock interface function", () => {
      // Rest cases for interfaces are tested in verification.spec.ts

      // when
      when(mockedFoo.sumByInterface(2, 3)).thenReturn(1000);

      // then
      expect(foo.sumByInterface(2, 3)).toEqual(1000);
    });
  });
  describe("Promise", () => {
    let mockedThen: ThenableInterface;
    let inst: ThenableInterface;

    beforeEach(() => {
      mockedThen = mock<ThenableInterface>();
      inst = instance(mockedThen);
    });

    it("does not create then descriptor for interface", () => {
      // given

      // when

      // then
      expect(inst.then).toBeUndefined();
    });
    it("creates then descriptor for interface", () => {
      // given

      // when
      when(mockedThen.then()).thenReturn("woof");

      // then
      expect(inst.then).toBeDefined();
    });
    it("does not create catch descriptor for interface", () => {
      // given

      // when

      // then
      expect(inst.catch).toBeUndefined();
    });
    it("creates catch descriptor for interface", () => {
      // given

      // when
      when(mockedThen.catch()).thenReturn("woof");

      // then
      expect(inst.catch).toBeDefined();
    });
  });
});
