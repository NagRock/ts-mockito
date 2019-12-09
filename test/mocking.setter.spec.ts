import { instance, mock, when } from "../src/ts-mockito";

describe("mocking", () => {
  let mockedFoo: FooWithGetterAndSetter;
  let foo: FooWithGetterAndSetter;

  describe("mocking object with getters and setters", () => {
    it("can mock unknown properties", () => {
      // given
      mockedFoo = mock(FooWithGetterAndSetter);

      // when
      mockedFoo["unknownProperty"] = 42;
      foo = instance(mockedFoo);

      // then
      expect(foo["unknownProperty"]).toEqual(42);
    });

    it("does define a when for the getter when a value is set on the mock", () => {
      // given
      mockedFoo = mock(FooWithGetterAndSetter);

      // when
      mockedFoo.twoPlusTwo = 42;
      foo = instance(mockedFoo);

      // then
      expect(foo.twoPlusTwo).toEqual(42);
    });

    it("does define a when for the getter when a value is set on the instance", () => {
      // given
      mockedFoo = mock(FooWithGetterAndSetter);

      // when
      foo = instance(mockedFoo);
      foo.twoPlusTwo = 42;

      // then
      expect(foo.twoPlusTwo).toEqual(42);
    });

    it("does allow users to supply a new getter value", () => {
      // given
      mockedFoo = mock(FooWithGetterAndSetter);
      foo = instance(mockedFoo);

      // when
      foo.twoPlusTwo = 100;
      when(mockedFoo.twoPlusTwo).thenReturn(42);

      // then
      expect(foo.twoPlusTwo).toEqual(42);
    });

    it("does allow users to set a value on the mock for a property with no getter or setter", () => {
      // given
      mockedFoo = mock(FooWithGetterAndSetter);

      // when
      mockedFoo.noGetter = 42;
      foo = instance(mockedFoo);

      // then
      expect(foo.noGetter).toEqual(42);
    });

    it("does allow users to set a value on the instance for a property with no getter or setter", () => {
      // given
      mockedFoo = mock(FooWithGetterAndSetter);
      foo = instance(mockedFoo);

      // when
      foo.noGetter = 42;

      // then
      expect(foo.noGetter).toEqual(42);
    });
  });
});

class FooWithGetterAndSetter {
  public noGetter = 10;

  constructor() {}

  public sampleMethod(): number {
    return 4;
  }

  public get twoPlusTwo(): number {
    return 2;
  }

  public set twoPlusTwo(value: number) {
    return;
  }
}
