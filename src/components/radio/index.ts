import MRadio from './src/radio.vue'

MRadio.install = Vue => {
  Vue.components(MRadio.name, MRadio)
}
export default MRadio