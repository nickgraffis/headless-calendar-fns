// vite.config.js
import path from 'path' 
import { defineConfig } from 'vite'
import license from 'rollup-plugin-license'
import { name, version, author } from './package.json'
import typescript from '@rollup/plugin-typescript';
const resolvePath = (str) => path.resolve(__dirname, str)

const fileName = (format) => {
  let type = format === 'cjs' ? 'c' : format === 'es' ? 'm' : format === 'iife' ? 'min.' : ''
  return `headless-calendar-matrix.${type}js`
}

module.exports = defineConfig({
  plugins: [
    {
      ...typescript({
        'declaration': true,
        'declarationDir': resolvePath('dist'),
        exclude: resolvePath('../node_modules/**'),
      }),
      apply: 'build',
    },
    {
      ...license({
        banner: `
          ${name} v${version}
          Copyright 2022<%= moment().format('YYYY') > 2022 ? '-' + moment().format('YYYY') : null %> ${author}
        `
      }),
      apply: 'build',
    }
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'createMatrix',
      formats: ['cjs', 'es', 'umd', 'iife'],
      fileName
    }
  }
})