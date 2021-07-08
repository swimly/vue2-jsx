import './checkbox-group.css';
import style from './checkbox-group.css.json'
export default {
  name: 'm-checkbox-group',
  provide () {
    return {
      share: this.share
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
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
    setValue (value, check) {
      let values = this.value
      if (check) {
        values.push(value)
      } else {
        const index = values.indexOf(value)
        values.splice(index, 1)
      }
      this.$emit('input', values)
      this.$emit('change', values)
    }
  },
  render (h) {
    return (
      <div class={style['checkbox-group']}>
        {this.$slots.default}
      </div>
    )
  }
}