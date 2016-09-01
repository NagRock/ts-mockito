import {anyNumber} from './matcher/AnyNumberMatcher';
import {mock, instance, when, verify} from './ts-mockito';

export class Generic<T> {

}


export class Temp {
    public sampleVar: string = 'test';

    public sampleMethod(param: number): string {
        this.sampleVar = param.toString();
        return this.sampleVar;
    }

    public sampleMethod2(first: string, second: number): number {
        return 10;
    }
}


export function main() {
    let myMock: Temp = mock(Temp);
    // myMock.sampleMethod(3);
    // myMock.sampleMethod2('sample text');
    when(myMock.sampleMethod(1)).thenReturn('jeden');
    when(myMock.sampleMethod(2)).thenReturn('dwa');
    when(myMock.sampleMethod(3)).thenReturn('trzy');

    when(myMock.sampleMethod2('sampleString', 3)).thenReturn(1);

    console.log('>>', instance(myMock).sampleMethod(1));
    console.log('>>', instance(myMock).sampleMethod(2));
    console.log('>>', instance(myMock).sampleMethod(2));
    // console.log('>>', instance(myMock).sampleMethod2('sampleString', 3));

    verify(myMock.sampleMethod(anyNumber())).thrice();

    // verify(myMock.sampleMethod(3)).calledTwice();

    // let myMock2: Mock<Temp> = new Mock();

    // when(myMock2.a.sampleMethod(3)).thenReturn('sample text');

    // when(myMock.sampleMethod2('macio'));
    // instance(myMock);
}