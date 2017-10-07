export class MockableFunctionsFinder {
    private notMockableFunctionNames: string[] = ["hasOwnProperty"];

    public find(code: string): string[] {
        const result: string[] = [];
        this.getSubCodes(code).forEach((subCode: string) => {
            this.getMethodNames(subCode).forEach((methodName: string) => {
                if (this.isMockable(methodName)) {
                    result.push(methodName);
                }
            });
        });
        return result;
    }

    public isMockable(name: string): boolean {
        return this.notMockableFunctionNames.indexOf(name) < 0;
    }

    private getSubCodes(code: string): string[] {
        return code.match(/\.(.{0,40})\(/g) || [];
    }

    private getMethodNames(subCode: string): string[] {
        return subCode.match(/[a-zA-Z_][a-zA-Z0-9_$]+/g) || [];
    }
}
