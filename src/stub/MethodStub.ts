export interface MethodStub {
    isApplicable(args: any[]): boolean;
    execute(args: any[]): void;
    getValue(): any;
    getGroupIndex(): number;
}
