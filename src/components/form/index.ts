import MForm from './src/form'

MForm.install = Vue => {
  Vue.components(MForm.name, MForm)
}
export default MForm