import MPage from './src/page'

MPage.install = Vue => {
  Vue.components(MPage.name, MPage)
}
export default MPage