import MTag from './src/tag.vue'

MTag.install = Vue => {
  Vue.components(MTag.name, MTag)
}
export default MTag