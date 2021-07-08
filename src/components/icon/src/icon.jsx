import './icon.css';
import style from './icon.css.json'
import '../assets/iconfont'
export default {
  name: 'm-icon',
  props: {
    name: {
      type: String,
      default: 'success'
    },
    size: {
      type: String | Number,
      default: 20
    },
    color: {
      type: String,
      default: ''
    },
    spin: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  mounted () {
    this.$refs.use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#icon-${this.name}`)
  },
  render (h) {
    const {size, color, spin, type} = this
    return (
      <div
        onClick={this.onClick}
        class={style['icon']}
        spin={spin}
        type={type}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          color
        }}
      >
        <svg aria-hidden="true" fill="currentColor">
          <use ref="use"></use>
        </svg>
      </div>
    )
  }
}