const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './public/js/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public/js/bundles/'
    },
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
    ], 
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                      publicPath: '../',
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                  'sass-loader'
                ],
              },
        ]
    }
}