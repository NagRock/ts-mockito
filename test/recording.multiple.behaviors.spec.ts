import {instance, mock, when} from '../src/ts-mockito';
import {Foo} from './utils/Foo';

describe('recording multiple behaviors', () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    describe('when more than one behavior matches', () => {
        it('using added earlier', () => {
            // given
            let sampleValue = 3;
            let firstCallExpectedResult = 'first';
            let secondCallExpectedResult = 'second';
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstCallExpectedResult);
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(secondCallExpectedResult);

            // when
            let firstCallResult = foo.convertNumberToString(sampleValue);
            let secondCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(firstCallExpectedResult);
            expect(secondCallResult).toEqual(secondCallExpectedResult);
        });
    });

    describe('when one of behaviors doesnt match', () => {
        it('it is skipped', () => {
            // given
            let sampleValue = 3;
            let firstCallExpectedResult = 'first';
            let secondCallExpectedResult = 'second';
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstCallExpectedResult);
            when(mockedFoo.convertNumberToString(123)).thenReturn('not matching behavior');
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(secondCallExpectedResult);

            // when
            let firstCallResult = foo.convertNumberToString(sampleValue);
            let secondCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(firstCallExpectedResult);
            expect(secondCallResult).toEqual(secondCallExpectedResult);
        });
    });

    describe('when calling same method multiple times', () => {
        describe('used behaviors are removed', () => {
            it('and when no more matches null is returned', () => {
                // given
                let sampleValue = 3;
                let firstCallExpectedResult = 'first';
                let secondCallExpectedResult = 'second';
                when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstCallExpectedResult);
                when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(secondCallExpectedResult);

                // when
                let firstCallResult = foo.convertNumberToString(sampleValue);
                let secondCallResult = foo.convertNumberToString(sampleValue);
                let thirdCallResult = foo.convertNumberToString(sampleValue);

                // then
                expect(firstCallResult).toEqual(firstCallExpectedResult);
                expect(secondCallResult).toEqual(secondCallExpectedResult);
                expect(thirdCallResult).toBeNull();
            });
        });
    });

    describe('when just one behavior was set', () => {
        it('behavior is not removed', () => {
            // given
            let sampleValue = 3;
            let firstCallExpectedResult = 'first';
            when(mockedFoo.convertNumberToString(sampleValue)).thenReturn(firstCallExpectedResult);

            // when
            let firstCallResult = foo.convertNumberToString(sampleValue);
            let secondCallResult = foo.convertNumberToString(sampleValue);
            let thirdCallResult = foo.convertNumberToString(sampleValue);

            // then
            expect(firstCallResult).toEqual(firstCallExpectedResult);
            expect(secondCallResult).toEqual(firstCallExpectedResult);
            expect(thirdCallResult).toEqual(firstCallExpectedResult);
        });
    });
});