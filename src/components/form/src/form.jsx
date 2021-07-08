import './form.css';
import style from './form.css.json'
export default {
  name: 'm-form',
  props: {
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    return (
      <div onClick={this.onClick} class={style['m-form']}>
        
      </div>
    )
  }
}