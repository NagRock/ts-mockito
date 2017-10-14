module.exports = function (config) {
    config.set({

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            "node_modules/babel-polyfill/dist/polyfill.js",
            "./src/**/*.ts",
            "./test/**/*.ts"
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.(ts|tsx)$/
            },

            tsconfig: "./tsconfig.json"
        },

        reporters: ["progress", "mocha"],

        browsers: ["Chrome"],

        mochaReporter: {
            output: 'minimal'
        },

        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false
    });
};
