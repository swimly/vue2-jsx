import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import {terser} from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
const postcssConfig = require('./postcss.config')
import pkg from '../package.json'
import progress from 'rollup-plugin-progress'
import filesize from 'rollup-plugin-filesize'
import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'

export default (name, env) => {
  const isEntry = name === pkg.ui
  const isDev = env === 'dev'
  const root = isEntry ? './src/' : './src/components/'
  const input = isEntry ? `${root}index.ts` : `${root}${name}/index.ts`
  const outputRoot = isEntry ? './' : `./src/components/${name}/`
  const postcssPlugins = postcssConfig(isDev).plugins
  const formats = ['umd']
  let output = []
  const ext = isDev ? '' : '.min'
  formats.forEach(fmt => {
    const dir = isEntry ? isDev ? `dist/${pkg.name}${ext}.js` : `dist/${fmt}/${pkg.name}${ext}.js` : `dist/${fmt}/${name}${ext}.js`
    output.push({
      file: `${outputRoot}${dir}`,
      format: fmt,
      name
    })
  })
  return {
    input,
    output,
    plugins: [
      vue({
        css: false,
        compileTemplate: true,
        defaultLang: {
          script: 'ts'
        },
        preprocessStyles: (res) => {
        }
      }),
      json(),
      resolve(),
      commonjs(),
      // css(),
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015'
      }),
      postcss({
        extract: true,
        plugins: postcssPlugins
      }),
      babel({
        exclude: [/\/core-js\//],
        runtimeHelpers: true,
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue', 'tsx'],
        presets: [
          ["@babel/preset-env", {
            modules: false,
            useBuiltIns: false,
            forceAllTransforms: true
          }],
          "@babel/preset-typescript"
        ]
      }),
      !isDev && filesize(),
      !isDev && progress({
        clearLine: false
      }),
      !isDev && terser()
    ],
    external: [
      'vue'
    ]
  }
}