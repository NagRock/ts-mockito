import {Matcher} from "./matcher/type/Matcher";
import {MethodStubCollection} from "./MethodStubCollection";
import {Mocker} from "./Mock";

export class MethodToStub {
    constructor(public methodStubCollection: MethodStubCollection,
                public matchers: Matcher[],
                public mocker: Mocker,
                public methodName: string) {
    }
}
