export class RedundantMethodNameInCodeFinder {
    private notMockableFunctionNames: string[] = ["hasOwnProperty"];

    public find(code: string): {} {
        const result: any = {};
        const subCodes: Array<string> = code.match(/\.(.{0,40})\(/g);
        if (subCodes && subCodes.length > 0) {
            for (const subCode of subCodes) {
                const methodNames = subCode.match(/[a-zA-Z_][a-zA-Z0-9_$]+/g);
                if (methodNames && methodNames.length > 0) {
                    for (const methodName of methodNames) {
                        if (this.notMockableFunctionNames.indexOf(methodName) < 0) {
                            result[methodName] = true;
                        }
                    }
                }
            }
        }
        return result;
    }
}
