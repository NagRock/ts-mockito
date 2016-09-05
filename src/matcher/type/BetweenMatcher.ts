import {Matcher} from './Matcher';

export function between(min:number, max:number): any {
    return new BetweenMatcher(min, max) as any;
}

class BetweenMatcher extends Matcher {
    constructor(private min:number, private max:number) {
        super();

        if(min > max) {
            throw new Error('min value can\'t be greater than max');
        }
    }

    match(value: any): boolean {
        return value >= this.min && value <= this.max;
    }

    toString():string {
        return 'between(' + this.min + ', ' + this.max + ')';
    }
}