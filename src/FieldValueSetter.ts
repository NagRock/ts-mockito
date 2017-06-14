export class FieldValueSetter<T> {
    constructor(private mock: T) {
    }

    public setValue<TKey extends keyof T>(key: TKey, value: T[TKey]) {
        (this.mock as any).__tsmockitoMocker.setFieldValue(key, value);
    }

    public setValues<TKey extends keyof T>(values: Pick<T, TKey>) {
        for (let id in values) {
            if (values.hasOwnProperty(id)) {
                this.setValue(id, values[id]);
            }
        }
    }
}