import * as _ from "lodash";
import {ObjectTraverser} from "../../src/utils/ObjectTraverser";

describe("ObjectTraverser", () => {
    describe("Traversing prototype chain", () => {
        it("calls given callback for each object from prototype chain", () => {
            // given
            let methodNames: string[] = [];

            // when
            new ObjectTraverser().traversePrototypeChain(ChildClass.prototype, (obj: any) => {
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
            new ObjectTraverser().traversePrototypeChain(null, (obj: any) => {
                called = true;
            });

            // then
            expect(called).toBeFalsy();
        });
    });

    describe("Traversing objects constructors", () => {
        it("calls given callback for each object constructor from prototype chain", () => {
            // given
            let classCodes: string[] = [];

            // when
            new ObjectTraverser().traverseClassInheritanceChain(ChildClass, (obj: any) => {
                classCodes = _.union(classCodes, [obj.toString().match(/function (.*)\(/)[1]]);
            });

            // then
            expect(classCodes).toContain("ParentClass");
            expect(classCodes).toContain("ChildClass");
        });

        it("doesn't call given callback for non constructors", () => {
            // given
            let called = false;

            // when
            new ObjectTraverser().traverseClassInheritanceChain(null, (obj: any) => {
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
            new ObjectTraverser().traverseObjectOwnProperties(ParentClass.prototype, (property: any) => {
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
            new ObjectTraverser().traverseObjectOwnProperties(null, (obj: any) => {
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
