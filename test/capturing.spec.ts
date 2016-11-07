import {Foo} from './utils/Foo';
import {mock, instance, when, anything} from '../src/ts-mockito';
import {Captor} from '../src/Captor';

describe('capturing method arguments', () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe('when method has been called', () => {
        it('captures all arguments passed to it', () => {
            // given
            let firstArgCaptor: Captor<number> = new Captor<number>();
            let secondArgCaptor: Captor<number> = new Captor<number>();
            when(mockedFoo.sumTwoNumbers(anything(), anything())).thenCapture(firstArgCaptor, secondArgCaptor);

            // when
            foo.sumTwoNumbers(5, 10);
            foo.sumTwoNumbers(15, 20);

            // then
            expect(firstArgCaptor.getFirstCallValue()).toEqual(5);
            expect(firstArgCaptor.getCallValueByIndex(0)).toEqual(5);
            expect(firstArgCaptor.getSecondCallValue()).toEqual(15);
            expect(firstArgCaptor.getLastCallValue()).toEqual(15);
            expect(firstArgCaptor.getCallValueByIndex(1)).toEqual(15);

            expect(secondArgCaptor.getFirstCallValue()).toEqual(10);
            expect(secondArgCaptor.getCallValueByIndex(0)).toEqual(10);
            expect(secondArgCaptor.getSecondCallValue()).toEqual(20);
            expect(secondArgCaptor.getLastCallValue()).toEqual(20);
            expect(secondArgCaptor.getCallValueByIndex(1)).toEqual(20);
        });
    });

    describe('when method has been called', () => {
        describe('but some calls has been skipped because of not matching values', () => {
            it('captures only fully matched calls', () => {
                // given
                let matchingFirstArg = 15;
                let secondArgCaptor: Captor<number> = new Captor<number>();
                when(mockedFoo.sumTwoNumbers(matchingFirstArg, anything())).thenCapture(new Captor(), secondArgCaptor);

                // when
                foo.sumTwoNumbers(5, 10);
                foo.sumTwoNumbers(matchingFirstArg, 20);

                // then
                expect(secondArgCaptor.getFirstCallValue()).toEqual(20);
                expect(secondArgCaptor.getLastCallValue()).toEqual(20);
            });
        });
    });
});