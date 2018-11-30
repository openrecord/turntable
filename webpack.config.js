const path = require('path');

module.exports = {
  entry: './functions/graphql.ts',
  output: {
    filename: 'graphql.js',
    path: path.resolve(__dirname, 'functions/dist')
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts']
  },
  node: {
    module: 'empty',
    fs: 'empty'
  }
};
