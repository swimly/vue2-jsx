import './form-item.css';
import style from './form-item.css.json'
export default {
  name: 'm-form-item',
  props: {
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    return (
      <div onClick={this.onClick} class={style['m-form-item']}>
        
      </div>
    )
  }
}