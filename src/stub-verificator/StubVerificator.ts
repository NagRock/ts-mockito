import { MethodToStub } from "../MethodToStub";

export interface StubVerificator {
  verify(methodToVerify: MethodToStub): void;
}
