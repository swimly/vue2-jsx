import MTooltip from './src/tooltip.vue'

MTooltip.install = Vue => {
  Vue.components(MTooltip.name, MTooltip)
}
export default MTooltip