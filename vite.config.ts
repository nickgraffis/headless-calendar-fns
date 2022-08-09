// vite.config.js
import path from 'path' 
import { defineConfig } from 'vite'
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import license from 'rollup-plugin-license'
import { name, version, author, typings } from './package.json'
import typescript from '@rollup/plugin-typescript';
import emitModulePackageFile from './build-plugins/emit-esm-package';
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
    }
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'createMatrix',
      formats: ['cjs', 'es', 'umd', 'iife'],
      fileName
    },
    rollupOptions: {
    }
  }
})