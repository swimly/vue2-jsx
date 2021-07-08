import MPagination from './src/pagination.vue'

MPagination.install = Vue => {
  Vue.components(MPagination.name, MPagination)
}
export default MPagination