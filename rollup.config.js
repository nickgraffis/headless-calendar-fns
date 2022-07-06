
// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import license from 'rollup-plugin-license'
import { name, version, main, module, browser, author, types } from './package.json'
import dts from 'rollup-plugin-dts'

const isProduction = process.env.NODE_ENV === 'production'

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
})

export default [
  bundle({
    output: [
      {
        file: main,
        name: main,
        format: 'cjs',
        plugins: [
          isProduction && terser()
        ],
        sourceMap: true,
      }, 
      {
        file: module,
        name: name,
        format: 'es',
        sourceMap: true,
      }, 
      {
        file: browser,
        name: name,
        format: 'umd',
        sourceMap: true,
      },
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
          Copyright 2018<%= moment().format('YYYY') > 2018 ? '-' + moment().format('YYYY') : null %> ${author}
        `
      })
    ]
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: types,
      format: 'es',
    },
  }),
]
