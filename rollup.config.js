import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      format: 'cjs',
      name: 'VuexRichStore',
      exports: 'named',
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
