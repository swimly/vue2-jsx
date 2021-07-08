import './space.css';
import style from './space.css.json'
export default {
  name: 'm-space',
  props: {
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    return (
      <div onClick={this.onClick} class={style['m-space']}>
        
      </div>
    )
  }
}