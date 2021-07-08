import './switch.css';
import style from './switch.css.json'
export default {
  name: 'm-switch',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (e) {
      this.$emit('update:checked', e.target.checked)
      this.$emit('change', e.target.checked)
    }
  },
  computed: {
  },
  render (h) {
    return (
      <div
        class={style['switch']}
      >
        <input
          type="checkbox"
          class={style['switch-core']}
          onChange={this.onChange}
          checked={this.checked}
        />
        <span
          class={style['switch-frame']}
        ></span>
      </div>
    )
  }
}