
// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import license from 'rollup-plugin-license'
import { name, version, author } from './package.json'

const isProduction = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)
const bundle = config => ({
  ...config,
})

export default [
  bundle({
    input: './src/timezones.ts',
    output: [
      {
        file: './dist/timezones.js',
        name: 'timezones',
        format: 'cjs',
        plugins: [
          isProduction && terser()
        ],
      }, 
      {
        file: './dist/timezones.mjs',
        name: 'timezones',
        format: 'es',
      }, 
      {
        file: './dist/timezones.js',
        name: 'timezones',
        format: 'umd',
        plugins: [
          isProduction && terser()
        ],
      },
      {
        file: './dist/timezones.min.js',
        name: 'timezones',
        format: 'iife',
        plugins: [
          isProduction && terser()
        ],
      }
    ],
    plugins: [
      json(),
      resolve({
        jsnext: true,
        main: true
      }),
      typescript({
        typescript: require('typescript')
      }),
      commonjs({
        include: 'node_modules/**',
        extensions: [ '.js' ],
        ignoreGlobal: false,
        sourceMap: false
      }),
      license({
        banner: `
          ${name} v${version}
          Copyright 2022<%= moment().format('YYYY') > 2022 ? '-' + moment().format('YYYY') : null %> ${author}
        `
      })
    ]
  }),
]
