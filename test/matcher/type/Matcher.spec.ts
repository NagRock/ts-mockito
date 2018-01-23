import {Matcher} from "../../../src/matcher/type/Matcher";

export function xor(a: boolean, b: boolean): boolean {
    return a && !b || !b && a;
}

describe("Matcher", () => {
    const testObj: Matcher = new Matcher();

    describe("not", () => {
        it("returns opposite value", () => {
            // when
            const result = testObj.match(null);
            const notResult = testObj.not().match(null);

            // then
            expect(xor(result, notResult)).toBeFalsy();
        });

        it("returns toString with 'not' prepended", () => {
            // when
            const result = testObj.toString();
            const notResult = testObj.not().toString();

            // then
            expect(`not().${result}`).toEqual(notResult);
        });
    });
});
