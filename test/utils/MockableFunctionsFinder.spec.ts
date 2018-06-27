import {MockableFunctionsFinder} from "../../src/utils/MockableFunctionsFinder";

describe("MockableFunctionsFinder", () => {
    describe("searching for method names in code", () => {
        it("returns all called and defined functions", () => {
            // given
            const code = getSampleCode();

            // when
            const result = new MockableFunctionsFinder().find(code);

            // then
            expect(result).toContain("log");
            expect(result).toContain("toString");
            expect(result).toContain("anonymousMethod");
            expect(result).toContain("asyncMethod1");
            expect(result).toContain("asyncMethod2");
        });

        it("should not find hasOwnProperty as it should not be mocked (because its used by mockito to evaluate properties)", () => {
            // given
            const code = getSampleCode();

            // when
            const result = new MockableFunctionsFinder().find(code);

            // then
            expect(result["hasOwnProperty"] instanceof Function).toBeTruthy();
        });
    });
});

function getSampleCode(): string {
    return `
export class Foo {
    constructor (private temp:string) {
        this.anonymousMethod = function(arg) {
            console.log(arg);
            temp.hasOwnProperty("fakeProperty");
        }

        this.asyncMethod1 = async arg => {
        }

        this.asyncMethod2 = async (foo, bar) => {
        }

    }

    private convertNumberToString(value:number):string {
        return value.toString();
    }
}
`;
}
