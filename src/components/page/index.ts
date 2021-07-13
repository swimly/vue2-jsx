import MPage from './src/page.vue'

MPage.install = Vue => {
  Vue.components(MPage.name, MPage)
}
export default MPage