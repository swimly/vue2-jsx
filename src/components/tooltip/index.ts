import MTooltip from './src/tooltip'

MTooltip.install = Vue => {
  Vue.components(MTooltip.name, MTooltip)
}
export default MTooltip