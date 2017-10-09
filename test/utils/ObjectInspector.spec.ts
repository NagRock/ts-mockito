import * as _ from "lodash";
import {ObjectInspector} from "../../src/utils/ObjectInspector";

describe("ObjectInspector", () => {
    describe("Traversing prototype chain", () => {
        it("calls given callback for each object from prototype chain", () => {
            // given
            let methodNames: string[] = [];

            // when
            new ObjectInspector().getObjectPrototypes(ChildClass.prototype).forEach((obj: any) => {
                methodNames = _.union(methodNames, Object.getOwnPropertyNames(obj));
            });

            // then
            expect(methodNames).toContain("sampleNumber");
            expect(methodNames).toContain("sampleString");
            expect(methodNames).toContain("sampleBoolean");
        });

        it("doesn't call given callback for non objects", () => {
            // given
            let called = false;

            // when
            new ObjectInspector().getObjectPrototypes(null).forEach((obj: any) => {
                called = true;
            });

            // then
            expect(called).toBeFalsy();
        });
    });

    describe("Traversing object own properties", () => {
        it("calls given callback for each object's property", () => {
            // given
            let propertyNames: string[] = [];

            // when
            new ObjectInspector().getObjectOwnPropertyNames(ParentClass.prototype).forEach((property: any) => {
                propertyNames = _.union(propertyNames, [property]);
            });

            // then
            expect(propertyNames).toContain("sampleString");
            expect(propertyNames).toContain("sampleBoolean");
        });

        it("doesn't call given callback for non objects", () => {
            // given
            let called = false;

            // when
            new ObjectInspector().getObjectOwnPropertyNames(null).forEach((obj: any) => {
                called = true;
            });

            // then
            expect(called).toBeFalsy();
        });
    });
});

class ParentClass {
    public sampleString(): string {
        return "sampleString";
    }

    public sampleBoolean(): boolean {
        return true;
    }
}

class ChildClass extends ParentClass {
    public sampleNumber(): number {
        return 4;
    }
}
