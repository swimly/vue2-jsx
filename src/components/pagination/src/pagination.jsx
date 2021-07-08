import './pagination.css';
import style from './pagination.css.json'
export default {
  name: 'm-pagination',
  props: {
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    return (
      <div onClick={this.onClick} class={style['m-pagination']}>
        
      </div>
    )
  }
}