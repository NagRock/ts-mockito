import {DeepEqualMatcher} from "../../../src/matcher/type/DeepEqualMatcher";
import {Matcher} from "../../../src/matcher/type/Matcher";
import {anyString, deepEqual, instance, mock, verify} from "../../../src/ts-mockito";

describe("DeepEqualMatcher", () => {
    describe("checking if two different instances of same number matches", () => {
        it("returns true", () => {
            // given
            const firstValue = 3;
            const secondValue = 3;
            const testObj: Matcher = new DeepEqualMatcher(firstValue);

            // when
            const result = testObj.match(secondValue);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if two different instances of same string matches", () => {
        it("returns true", () => {
            // given
            const firstValue = "sampleString";
            const secondValue = "sampleString";
            const testObj: Matcher = new DeepEqualMatcher(firstValue);

            // when
            const result = testObj.match(secondValue);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if two different instances of same nested objects matches", () => {
        it("returns true", () => {
            // given
            const firstValue = {a: 1, b: {c: 2}};
            const secondValue = {a: 1, b: {c: 2}};
            const testObj: Matcher = new DeepEqualMatcher(firstValue);

            // when
            const result = testObj.match(secondValue);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe("checking if two nested objects matches when one leaf value is different", () => {
        it("returns true", () => {
            // given
            const firstValue = {a: 1, b: {c: 2}};
            const secondValue = {a: 1, b: {c: 99999}};
            const testObj: Matcher = new DeepEqualMatcher(firstValue);

            // when
            const result = testObj.match(secondValue);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe("checking if expected value has Matcher as a value", () => {
        it("returns true if matcher returns true", () => {
            // given
            const firstValue = {a: 1, b: anyString()};
            const secondValue = {a: 1, b: "2"};
            const testObj: Matcher = new DeepEqualMatcher(firstValue);

            // when
            const result = testObj.match(secondValue);

            // then
            expect(result).toBeTruthy();
        });

        it("returns false if matcher returns false", () => {
            // given
            const firstValue = {a: 1, b: anyString()};
            const secondValue = {a: 1, b: 2};
            const testObj: Matcher = new DeepEqualMatcher(firstValue);

            // when
            const result = testObj.match(secondValue);

            // then
            expect(result).toBeFalsy();
        });
    });
});

describe("deepEqual", () => {
  describe("using in verify statements", () => {
      it("can be used for equality", () => {
        class Foo {
          public add = (num1: number, num2: number): number => num1 + num2;
        }
        const foo = mock(Foo);
        instance(foo).add(1, 2);
        verify(foo.add(deepEqual(1), deepEqual(2))).once();
      });
  });
});
