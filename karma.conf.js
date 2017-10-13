module.exports = function (config) {
    config.set({

        basePath: "./",

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "test/**/*.ts" }
        ],

        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json"
        },

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        reporters: ["progress", "karma-typescript"],

        browsers: ["Chrome"]

    });
};
