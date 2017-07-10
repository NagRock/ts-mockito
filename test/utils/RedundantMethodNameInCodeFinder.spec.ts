import {RedundantMethodNameInCodeFinder} from '../../src/utils/RedundantMethodNameInCodeFinder';

describe('RedundantMethodNameInCodeFinder', () => {
    describe('searching for method names in code', () => {
        it('returns all called and defined functions', () => {
            // given
            const code = getSampleCode();

            // when
            const result = new RedundantMethodNameInCodeFinder().find(code);

            // then
            expect(result['log']).toBeTruthy();
            expect(result['toString']).toBeTruthy();
            expect(result['anonymousMethod']).toBeTruthy();
        });

        it('should not find hasOwnProperty as it should not be mocked (because its used by mockito to evaluate properties)', () => {
            // given
            const code = getSampleCode();

            // when
            const result = new RedundantMethodNameInCodeFinder().find(code);

            // then
            expect(result['hasOwnProperty'] instanceof Function).toBeTruthy();
        });
    });
});

function getSampleCode():string {
    return `
export class Foo {
    constructor (private temp:string) {
        this.anonymousMethod = function(arg) {
            console.log(arg);
            temp.hasOwnProperty("fakeProperty");
        }
    }
    
    private convertNumberToString(value:number):string {
        return value.toString();
    }
}
`;
};