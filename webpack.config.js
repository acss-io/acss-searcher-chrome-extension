var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'popup.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'webpack-atomizer-loader',
                query: {
                    configPath: path.resolve('./atomCssConfig.js')
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html', to: 'popup.html' },
            { from: './manifest.json' },
            { from: './icon.png' }
        ])
    ]
};
