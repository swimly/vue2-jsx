import MTag from './src/tag'

MTag.install = Vue => {
  Vue.components(MTag.name, MTag)
}
export default MTag