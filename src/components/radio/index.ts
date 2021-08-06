import MRadio from './src/radio'

MRadio.install = Vue => {
  Vue.components(MRadio.name, MRadio)
}
export default MRadio