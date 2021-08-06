import MPagination from './src/pagination'

MPagination.install = Vue => {
  Vue.components(MPagination.name, MPagination)
}
export default MPagination