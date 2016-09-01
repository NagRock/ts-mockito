import {Matcher} from './Matcher';

export function deepEqual(expectedValue:any):any {
    return new DeepEqualMatcher(expectedValue);
}

class DeepEqualMatcher extends Matcher {
    constructor(private expectedValue: any) {
        super();
    }

    match(value: any): boolean {
        return _.isEqual(this.expectedValue, value);
    }

    toString():string {
        return 'deepEqual(' + this.expectedValue + ')';
    }
}