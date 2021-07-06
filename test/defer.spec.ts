import { anything, defer, fnmock, instance, mock, verify, when } from "../src/ts-mockito";

class MockObject {
    public method(): Promise<number> {
        return Promise.resolve(100);
    }
}

describe("defer", () => {
    it("resolves a promise", async () => {
        const resolved: (value: number) => void = fnmock();
        const obj: MockObject = mock(MockObject);
        const d = defer<number>();
        when(obj.method()).thenReturn(d);

        instance(obj).method().then(instance(resolved));
        verify(resolved(anything())).never();

        d.resolve(1);
        await verify(resolved(1)).timeout(100);
    });

    it("rejects a promise", async () => {
        const rejected: (err: any) => void = fnmock();
        const obj: MockObject = mock(MockObject);
        const d = defer<number>();
        when(obj.method()).thenReturn(d);

        instance(obj).method().catch(instance(rejected));
        verify(rejected(anything())).never();

        d.reject(1);
        await verify(rejected(1)).timeout(100);
    });
});
