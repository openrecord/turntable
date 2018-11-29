// rollup.config.js
import graphql from 'rollup-plugin-graphql';
import typescript from 'rollup-plugin-typescript';

export default {
  input: './functions/graphql.ts',
  output: {
    format: 'cjs',
    dir: "./dist/functions/",
    file: "graphql.js"
  },
  plugins: [
    graphql(),
    typescript(),
  ]
}