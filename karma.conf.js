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
                entrypoints: /\.spec\.(ts|tsx)$/,
                resolve: {
                    directories: ["src", "node_modules"]
                }
            },

            tsconfig: "./tsconfig.json"
        },

        reporters: ["progress", "mocha"],

        browsers: ["CustomChromeHeadless", "PhantomJS"],

        mochaReporter: {
            output: 'minimal'
        },

        customLaunchers: {
            'CustomChromeHeadless': {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ],
                debug: true
            }
        },

        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false
    });
};
