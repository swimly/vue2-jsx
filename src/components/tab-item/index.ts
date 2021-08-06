import MTabItem from './src/tab-item'

MTabItem.install = Vue => {
  Vue.components(MTabItem.name, MTabItem)
}
export default MTabItem