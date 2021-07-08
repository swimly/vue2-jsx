import './select-option.css';
import style from './select-option.css.json'
export default {
  name: 'm-select-option',
  inject: ['share'],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    isActive () {
      if (typeof this.share.value === 'string') {
        return this.value === this.share.value
      } else {
        return this.share.value.indexOf(this.value) >= 0
      }
    }
  },
  methods: {
    onClick (e) {
      this.$parent.onClick(this.value)
    }
  },
  render (h) {
    return (
      <div
        onClick={this.onClick}
        class={style['select-option']}
        active={this.isActive}
      >
        {this.$slots.default}
      </div>
    )
  }
}