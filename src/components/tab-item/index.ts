import MTabItem from './src/tab-item.vue'

MTabItem.install = Vue => {
  Vue.components(MTabItem.name, MTabItem)
}
export default MTabItem