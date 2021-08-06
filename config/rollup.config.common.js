// import fs from 'fs'
import pkg from '../package.json'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import {terser} from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
const root = './src/components'
const functions = require('../src/utils/postcss.function.js')
let components = [
  {
    name: pkg.name,
    path: './src/index.common.ts'
  }
]
// fs.readdirSync(root).map(file => {
//   components.push({
//     name: file,
//     path: `${root}/${file}/index.common.ts`
//   })
// })
let configs = []
components.forEach((item) => {
  configs.push({
    input: item.path,
    output: [{
      file: `dist/common/${item.name}/${item.name}.js`,
      format: 'umd',
      name: item.name
    }],
    plugins: [
      json(),
      resolve(),
      postcss({
        extract: false,
        plugins: [
          require('postcss-prepend-imports')({
            path: `./src/themes/${pkg.theme}`,
            files: ['index.css']
          }),
          require('postcss-modules')({
            generateScopedName: pkg.prefix + "-[local]_[hash:base64:5]"
          }),
          require('postcss-import')(),
          require('postcss-nested')(),
          pkg.px2rem && require('postcss-pxtorem')({
            rootValue: 20,
            propList: ['*', '!border'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            exclude: /node_modules/i
          }),
          require('postcss-color-mod-function')(),
          require('autoprefixer')({
            overrideBrowserslist: pkg.browserslist
          }),
          require('postcss-functions')({
            functions
          }),
          require('postcss-simple-vars')(),
          require('cssnano')
        ]
      }),
      commonjs(),
      terser(),
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015'
      }),
      babel({
        exclude: [/\/core-js\//],
        runtimeHelpers: true,
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue', 'tsx', '.ts'],
        presets: [
          ["@babel/preset-env", {
            modules: false,
            useBuiltIns: false,
            forceAllTransforms: true
          }],
          "@babel/preset-typescript"
        ]
      })
    ]
  })
})
export default configs