import {Mock} from './Mock';
import {MethodStubVerificator} from './MethodStubVerificator';
import {MethodStubSetter} from './MethodStubSetter';
import {AnyNumberMatcher} from "./matcher/type/AnyNumberMatcher";
import {AnyStringMatcher} from "./matcher/type/AnyStringMatcher";
import {AnythingMatcher} from "./matcher/type/AnythingMatcher";
import {BetweenMatcher} from "./matcher/type/BetweenMatcher";
import {DeepEqualMatcher} from "./matcher/type/DeepEqualMatcher";
import {NotNullMatcher} from "./matcher/type/NotNullMatcher";
import {Matcher} from "./matcher/type/Matcher";
import {StrictEqualMatcher} from "./matcher/type/StrictEqualMatcher";

export function mock<T>(clazz: {new(...args:any[]): T; }): T {
    return new Mock(clazz).getMock();
}

export function verify<T>(method: T): MethodStubVerificator<T> {
    return new MethodStubVerificator(method as any);
}

export function when<T>(method: T): MethodStubSetter<T> {
    return new MethodStubSetter(method as any);
}

export function instance<T>(mock: T): T {
    return (mock as any).__tsmockitoInstance as T;
}

export function anyNumber(): any {
    return new AnyNumberMatcher() as any;
}

export function anyString(): any {
    return new AnyStringMatcher() as any;
}

export function anything(): any {
    return new AnythingMatcher() as any;
}

export function between(min:number, max:number): any {
    return new BetweenMatcher(min, max) as any;
}

export function deepEqual(expectedValue:any):any {
    return new DeepEqualMatcher(expectedValue);
}

export function notNull(): any {
    return new NotNullMatcher() as any;
}

export function strictEqual(expectedValue:any):Matcher {
    return new StrictEqualMatcher(expectedValue);
}