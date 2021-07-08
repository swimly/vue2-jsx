import MForm from './src/form.vue'

MForm.install = Vue => {
  Vue.components(MForm.name, MForm)
}
export default MForm