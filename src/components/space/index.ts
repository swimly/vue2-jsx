import MSpace from './src/space'

MSpace.install = Vue => {
  Vue.components(MSpace.name, MSpace)
}
export default MSpace