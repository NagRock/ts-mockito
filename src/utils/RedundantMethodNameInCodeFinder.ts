export class RedundantMethodNameInCodeFinder {
    private notMockableFunctionNames: string[] = ["hasOwnProperty"];

    find(code: string): any {
        let result: any = [];
        let subCodes: Array<string> = code.match(/\.(.{0,40})\(/g);
        if (subCodes && subCodes.length > 0) {
            for (let subCode of subCodes) {
                let methodNames = subCode.match(/[a-zA-Z_][a-zA-Z0-9_$]+/g);
                if (methodNames && methodNames.length > 0) {
                    for (let methodName of methodNames) {
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