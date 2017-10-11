/**
 * Looking for all function calls and declarations and provides an array of their names. The mechanism is greedy
 * and tries to match as many function names as it can find and not only those of inspecting class.
 *
 * Matching occurrences are:
 *     - [.]functionName(
 *     - [.]functionName = (
 *     - [.]functionName = function(
 *     - [.]functionName = function otherName(
 */
export class MockableFunctionsFinder {
    private functionNameRegex = /[.\s]([^.\s]+?)(?:\(|\s+=\s+(?:function\s*(?:[^.\s]+?\s*)?)?\()/g;
    private cleanFunctionNameRegex = /^[.\s]([^.\s]+?)[\s(]/;
    private excludedFunctionNames: string[] = ["hasOwnProperty", "function"];

    public find(code: string): string[] {
        return (code.match(this.functionNameRegex) || [])
            .map((match: string) => match.match(this.cleanFunctionNameRegex)[1])
            .filter((functionName: string) => this.isMockable(functionName));
    }

    private isMockable(name: string): boolean {
        return this.excludedFunctionNames.indexOf(name) < 0;
    }
}
