import MCol from './src/col'

MCol.install = Vue => {
  Vue.components(MCol.name, MCol)
}
export default MCol