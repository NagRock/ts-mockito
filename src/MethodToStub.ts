import {MethodStubCollection} from './MethodStubCollection';
import {Matcher} from './matcher/type/Matcher';
import {Mocker} from './Mock';

export class MethodToStub {
    constructor(public methodStubCollection: MethodStubCollection,
                public matchers: Array<Matcher>,
                public mocker: Mocker,
                public name: string) {
    }
}