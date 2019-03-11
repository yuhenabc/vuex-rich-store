import babel from 'rollup-plugin-babel';

export default {
  input: 'src/VuexRichStore.js',
  output: [
    {
      file: 'index.js',
      format: 'cjs',
      name: 'VuexRichStore'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
