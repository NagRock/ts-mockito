module.exports = {
    entry: "./src/ts-mockito.ts",
    bail: true,
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.html'],
        modules: ['node_modules', 'src']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "awesome-typescript-loader"
                }
            }
        ]
    }
};
