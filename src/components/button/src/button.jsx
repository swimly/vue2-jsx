import './button.css';
import style from './button.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    conner: {
      type: Boolean,
      default: true
    },
    rounder: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      el: null
    }
  },
  mounted () {
    this.el = this.$refs.el
  },
  methods: {
    onClick (e) {
      this.el.focus()
      this.$emit('click', e)
    },
    renderIcon () {
      if (this.icon) {
        return (
          <Icon name={this.icon} size="14"/>
        )
      }
    }
  },
  render (h) {
    const {type, conner, rounder, outline, plain, text} = this
    return (
      <button
      onClick={this.onClick}
      class={style['button']}
      type={type}
      conner={conner}
      rounder={rounder}
      outline={outline}
      plain={plain}
      text={text}
      ref="el"
      >
        <span class={style['button-icon']}>{this.icon ? this.renderIcon() : this.$slots.icon}</span>
        <span class={style['button-label']}>{this.label ? this.label : this.$slots.default}</span>
      </button>
    )
  }
}