import MCol from './src/col.vue'

MCol.install = Vue => {
  Vue.components(MCol.name, MCol)
}
export default MCol