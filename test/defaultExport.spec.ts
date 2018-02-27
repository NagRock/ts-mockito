import mockitoDefault from "../src/ts-mockito";
import {spy} from "../src/ts-mockito";
import * as asteriskStyleImport from "../src/ts-mockito";

describe("default export", () => {
    it("is an object", () => {
        expect(mockitoDefault).toBeDefined();
        expect(typeof mockitoDefault === "object").toBeTruthy();
        expect(mockitoDefault).toBe(asteriskStyleImport.default);
    });

    it("contains proper member functions", () => {
        expect(typeof mockitoDefault.spy === "function").toBeTruthy();
        expect(mockitoDefault.spy).toBe(spy);
    });

    it("contains each module member function", () => {
        // Asterisk style import contains all member function + the default, so default export should have one
        // member less.
        expect(Object.keys(mockitoDefault).length).toBe(Object.keys(asteriskStyleImport).length - 1);
    });
});
