import {Mock} from './Mock';
import {MethodStubVerificator} from './MethodStubVerificator';
import {MethodStubSetter} from './MethodStubSetter';

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