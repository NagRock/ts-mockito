import {Matcher} from './Matcher';

export function anyNumber(): number {
    return new AnyNumberMatcher() as any;
}

class AnyNumberMatcher extends Matcher {
    constructor() {
        super();
    }

    match(value: any): boolean {
        return _.isNumber(value);
    }

    toString():string {
        return 'anyNumber()';
    }
}