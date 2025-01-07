const rspack = require('@rspack/core');
const { VueLoaderPlugin } = require('vue-loader');

/** @type {import('@rspack/cli').Configuration} */
const config = {
    mode:'development',
    context: __dirname,
    entry: {
        main: './src/main.js',
    },
    cache: true,
    output: {
        filename: '[name].js',
        publicPath: '/',

        // ❓❓❓ set uniqueName explicitly to make HMR work
        uniqueName: 'app',
    },
    experiments: {
        css: true,

        lazyCompilation:   {
            test(module) {
                const name = module.nameForCondition();

                const rules = [
                    'src/components',
                ]


                const shouldLazyCompile = rules.some(rule => name.includes(rule));

                return shouldLazyCompile;
            },
        },

        futureDefaults: true,

        outputModule: true,

        incremental:  { make: true, emitAssets: true },

        cache: {
            type: 'persistent',
            buildDependencies: [__filename],
            storage: {
                type: 'filesystem',
                directory: 'node_modules/.cache/rspack',
            },
        }
    },
    devServer: {
        historyApiFallback: true,
    },
    devtool: false,
    plugins: [
        new VueLoaderPlugin(),
        new rspack.HtmlRspackPlugin({
            template: './index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            experimentalInlineMatchResource: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                loader: 'less-loader',
                type: 'css',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
            },
        ],
    },
};
module.exports = config;