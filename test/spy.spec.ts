import {Foo} from "./utils/Foo";
import {spy} from "../src/ts-mockito";

describe("spying object", () => {
  let fooSpy: Foo;

  beforeEach(() => {
  });

  describe("a", () => {
    fit("b", () => {
      // given
      fooSpy = spy(new Foo());

      // when
      const result = fooSpy.sumTwoNumbers(1, 2);

      // then
      console.log("Result", result);
    });
  });
});