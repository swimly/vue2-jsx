import './page.css';
import style from './page.css.json'
export default {
  name: 'm-page',
  props: {
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    return (
      <div onClick={this.onClick} class={style['page']}>
        
      </div>
    )
  }
}