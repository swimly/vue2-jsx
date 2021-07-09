import MScroller from './src/scroller.vue'

MScroller.install = Vue => {
  Vue.components(MScroller.name, MScroller)
}
export default MScroller