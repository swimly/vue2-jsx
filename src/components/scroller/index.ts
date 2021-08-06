import MScroller from './src/scroller'

MScroller.install = Vue => {
  Vue.components(MScroller.name, MScroller)
}
export default MScroller