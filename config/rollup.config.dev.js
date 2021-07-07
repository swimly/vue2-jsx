import rollupConfig from './rollup.config'
import pkg from '../package.json'

export default () => {
  const components = [pkg.ui]
  let configs = []
  components.forEach( async (name) => {
    const con = await rollupConfig(name, 'dev')
    configs.push(con)
  })
  return configs
}