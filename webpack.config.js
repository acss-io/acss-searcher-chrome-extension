var CopyWebpackPlugin = require('copy-webpack-plugin');

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
            { from: './icon.png' },
            { from: './node_modules/bulma/css/bulma.css', to: 'css/bulma.css' },
            { from: './node_modules/bulma/css/bulma.css.map', to: 'css/bulma.css.map' }
        ])
    ]
};
