import MSelectOption from './src/select-option.vue'

MSelectOption.install = Vue => {
  Vue.components(MSelectOption.name, MSelectOption)
}
export default MSelectOption