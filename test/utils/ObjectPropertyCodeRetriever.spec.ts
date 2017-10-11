import {ObjectPropertyCodeRetriever} from "../../src/utils/ObjectPropertyCodeRetriever";

describe("ObjectPropertyCodeRetriever", () => {
    describe("Properties code retrieving", () => {
        const objectPropertyCodeRetriever: ObjectPropertyCodeRetriever = new ObjectPropertyCodeRetriever();
        let object: any;

        beforeEach(() => {
            object = {
                stringProperty: "stringProperty",
                booleanProperty: true,
                testMethod: () => true,
                get someValue() {
                    return true;
                },
                set someValue(newValue: boolean) {
                    // nothing here
                },
            };
        });

        it("Provides code of given existing property", () => {
            expect(objectPropertyCodeRetriever.get(object, "stringProperty")).toBe("stringProperty");
            expect(objectPropertyCodeRetriever.get(object, "booleanProperty")).toBe("true");
            expect(objectPropertyCodeRetriever.get(object, "testMethod")).toBe("function () {return true;}");
        });

        it("Provides code of given existing property accessors", () => {
            expect(objectPropertyCodeRetriever.get(object, "someValue")).toMatch(/get someValue\(\)./);
            expect(objectPropertyCodeRetriever.get(object, "someValue")).toMatch(/set someValue\(newValue\)/);
        });

        it("Returns empty string when checking non existent property", () => {
            expect(objectPropertyCodeRetriever.get(object, "nonExistentProperty")).toBe("");
        });
    });
});
