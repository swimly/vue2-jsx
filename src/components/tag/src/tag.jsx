import './tag.css';
import style from './tag.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-tag',
  props: {
    allowClose: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    outline: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 32
    }
  },
  methods: {
    onClick (e) {
      e.stopPropagation()
      this.$emit('click', e)
    },
    onCloseClick (e) {
      e.stopPropagation()
      this.$emit('close', e)
    },
    renderClose () {
      if (this.allowClose) {
        return (
          <Icon onClick={this.onCloseClick} name="close" size="12"/>
        )
      }
    }
  },
  computed: {
    sizeStyle () {
      return {
        height: `${this.size}px`,
        padding: `0 ${this.size - 20}px`,
        minWidth: `${this.size * 2}px`
      }
    }
  },
  render (h) {
    return (
      <div
        onClick={this.onClick}
        class={style['tag']}
        type={this.type}
        outline={this.outline}
        style={this.sizeStyle}
      >
        <span class={style['tag-icon']}></span>
        <span class={style['tag-label']}>{this.$slots.default}</span>
        {this.renderClose()}
      </div>
    )
  }
}