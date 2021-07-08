import MSwitch from './src/switch.vue'

MSwitch.install = Vue => {
  Vue.components(MSwitch.name, MSwitch)
}
export default MSwitch