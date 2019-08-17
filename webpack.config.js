const {resolve} = require('path');
module.exports = {
  context: resolve('./src/reactSrc/'),
  entry: resolve('./src/reactSrc/index.tsx'),
  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: resolve('./public'),
    // historyApiFallback: true,
    port: 3005
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".css", "scss", "sass"]
  },


  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [resolve('./src/electronSrc/')],
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            // options: {
            //   includePaths: ['absolute/path/a', 'absolute/path/b'],
            // },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            // options: {
            //   includePaths: ['absolute/path/a', 'absolute/path/b'],
            // },
          },
        ],
      },
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  output: {
    path: resolve('./public/dist'),
    filename: 'bundle.js'
  }
};
