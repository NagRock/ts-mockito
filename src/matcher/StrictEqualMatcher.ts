import {Matcher} from './Matcher';

export function strictEqual(expectedValue:any):Matcher {
    return new StrictEqualMatcher(expectedValue);
}

class StrictEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    match(value: any): boolean {
        return this.expectedValue === value;
    }

    toString():string {
        return 'strictEqual(' + this.expectedValue + ')';
    }
}