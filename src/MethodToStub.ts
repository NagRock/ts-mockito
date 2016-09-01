import {MethodStubCollection} from './MethodStubCollection';
import {Matcher} from './matcher/Matcher';
import {Mock} from './Mock';

export class MethodToStub {
    constructor(public methodStubCollection: MethodStubCollection,
                public matchers: Array<Matcher>,
                public mock: Mock,
                public name: string) {
    }
}