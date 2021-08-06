import MSwitch from './src/switch'

MSwitch.install = Vue => {
  Vue.components(MSwitch.name, MSwitch)
}
export default MSwitch