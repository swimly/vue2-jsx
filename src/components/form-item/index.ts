import MFormItem from './src/form-item.vue'

MFormItem.install = Vue => {
  Vue.components(MFormItem.name, MFormItem)
}
export default MFormItem