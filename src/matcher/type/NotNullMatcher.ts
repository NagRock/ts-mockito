import {Matcher} from './Matcher';

export function notNull(): any {
    return new NotNullMatcher() as any;
}

class NotNullMatcher extends Matcher {
    match(value: any): boolean {
        return !_.isNull(value);
    }

    toString(): string {
        return 'notNull()';
    }
}