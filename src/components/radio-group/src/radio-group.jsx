import './radio-group.css';
import style from './radio-group.css.json'
export default {
  name: 'm-radio-group',
  provide () {
    return {
      share: this.share
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      share: {
        values: this.value
      }
    }
  },
  methods: {
    setValue (value) {
      this.share.values = value
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },
  render (h) {
    return (
      <div class={style['radio-group']}>
        {this.$slots.default}
      </div>
    )
  }
}