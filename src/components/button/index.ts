import MButton from './src/button.vue'

MButton.install = Vue => {
  Vue.components(MButton.name, MButton)
}
export default MButton