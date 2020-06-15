import { Mocker } from "../src/Mock";
import { anything, instance, mock, newVerify, newWhen, times, verify, when } from "../src/ts-mockito";
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

        newVerify(bar, times(4)).sumTwoNumbers(10, 20);
    });

    it('property', () => {
        const bar: Bar = mock();
        newWhen(bar).something.thenReturn(44);

        newVerify(bar, times(5)).something.setter(3);

        // newNewVerify(bar, times(5)).verify(() => bar.something)
        // newVerifyGetter(bar, times(5)).getter((bar) => bar.something);
    });
});
