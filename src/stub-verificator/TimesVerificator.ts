import { MethodToStub } from "../MethodToStub";
import { MethodCallToStringConverter } from "../utils/MethodCallToStringConverter";
import { StubVerificator } from "./StubVerificator";

export class TimesVerificator implements StubVerificator {
  private methodCallToStringConverter: MethodCallToStringConverter = new MethodCallToStringConverter();

  constructor(
    private value: number,
  ) {
  }

  public verify(methodToVerify: MethodToStub): void {
    const allMatchingActions = methodToVerify.mocker.getAllMatchingActions(methodToVerify.name, methodToVerify.matchers);
    if (this.value !== allMatchingActions.length) {
      const methodToVerifyAsString = this.methodCallToStringConverter.convert(methodToVerify);
      throw new Error(`Expected "${methodToVerifyAsString}to be called ${this.value} time(s). But has been called ${allMatchingActions.length} time(s).`);
    }
  }
}
