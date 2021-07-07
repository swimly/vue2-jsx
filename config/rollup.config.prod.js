import rollupConfig from './rollup.config'
import pkg from '../package.json'
import fs from 'fs'

function getComponents (root) {
  let arr = [pkg.ui]
  fs.readdirSync(root).map(file => {
    arr.push(file)
  })
  return arr
}

export default () => {
  const components = getComponents('./src/components')
  let configs = []
  components.forEach( async (name) => {
    const con = await rollupConfig(name, 'prod')
    configs.push(con)
  })
  return configs
}