import { Mocker } from "../src/Mock";
import { anything, instance, mock, newWhen, verify, when } from "../src/ts-mockito";
import { Bar } from "./utils/Bar";
import {Foo} from "./utils/Foo";

describe("mocking", () => {

    it('asd', () => {
        const bar: Bar = mock();
        newWhen(bar).sumTwoNumbers(10, 20).thenReturn(50);

        bar.sumTwoNumbers(10, 20);
        bar.sumTwoNumbers(10, 20);
        bar.sumTwoNumbers(10, 20);
        bar.sumTwoNumbers(10, 20);

        // const tsmockitoMocker = (bar as any).__tsmockitoMocker as Mocker;
        // verify(tsmockitoMocker).twice();
    });

    it('property', () => {
        const bar: Bar = mock();
        newWhen(bar).something.thenReturn(44);



        // const tsmockitoMocker = (bar as any).__tsmockitoMocker as Mocker;
        // verify(tsmockitoMocker).twice();
    });
});
