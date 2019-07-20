import { instance, mock, when } from "../src/ts-mockito";
import { FooInterface } from "./utils/FooInterface";

describe("Interface", () => {
  let mockedFoo: FooInterface;
  let foo: FooInterface;

  if (typeof Proxy === "undefined") {
    pending("Testing browser doesn't support Proxy.");
  }

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
