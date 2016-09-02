import {Matcher} from './Matcher';

export function anything(): any {
    return new AnythingMatcher() as any;
}

class AnythingMatcher extends Matcher {
    constructor() {
        super();
    }

    match(value: any): boolean {
        return true;
    }

    toString(): string {
        return 'anything()';
    }
}