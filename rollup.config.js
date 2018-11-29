// rollup.config.js
import config from 'config';
import graphql from 'rollup-plugin-graphql';
import replace from 'rollup-plugin-replace';
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
    replace({
      CONFIG: JSON.stringify(config)
    }),
    typescript(),
  ]
}