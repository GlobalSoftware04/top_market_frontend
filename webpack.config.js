// // webpack.config.js

// const path = require('path');

// module.exports = {
//   // Other config like entry, output, loaders, etc.
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },

//   // ✅ Add this section or modify if it already exists
//   resolve: {
//     extensions: ['.js', '.jsx', '.json'], // ✅ Ensures no .cjs is wrongly expected
//   },

//   // Your module.rules loaders go here
// };


// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'cheap-module-source-map',  // ✅ This enables source maps for debugging
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
