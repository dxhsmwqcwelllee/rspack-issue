const rspack = require('@rspack/core');
const { VueLoaderPlugin } = require('vue-loader');
const {
    container: { ModuleFederationPlugin },
} = require('@rspack/core');
const path = require("path");


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

        // ❓❓❓ set uniqueName explicitly to make HMR work
        uniqueName: 'app1',
    },
    experiments: {
        css: true,

        // lazyCompilation:   {
        //     test(module) {
        //         const name = module.nameForCondition();
        //
        //         const rules = [
        //             'src/components',
        //         ]
        //
        //
        //         const shouldLazyCompile = rules.some(rule => name.includes(rule));
        //
        //         return shouldLazyCompile;
        //     },
        // },

        // futureDefaults: true,

        // outputModule: true,

        // incremental:  { make: true, emitAssets: true },

        // cache: {
        //     type: 'persistent',
        //     buildDependencies: [__filename],
        //     storage: {
        //         type: 'filesystem',
        //         directory: 'node_modules/.cache/rspack',
        //     },
        // }
    },
    devServer: {
        historyApiFallback: true,
        port: 3001,
    },
    devtool: false,
    plugins: [
        new VueLoaderPlugin(),
        new rspack.HtmlRspackPlugin({
            template: './index.html',
        }),

        new ModuleFederationPlugin({
            name: 'app1',
            filename: 'mf-entry.js',
            exposes: {
                './utils': './src/utils/index',
            },
            remotes: {
                'app3': `app3@[window.MF_CONFIG.app3.url]`,
            },
            shared: {
                vue: {
                    singleton: true,
                    requiredVersion: '2.7.14',
                    strictVersion: true,
                },
            },

            runtimePlugins: [path.join(__dirname, './runtime-plugin.js')],
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