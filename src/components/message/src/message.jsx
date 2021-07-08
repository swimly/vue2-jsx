import './message.css';
import style from './message.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-message',
  props: {
  },
  data () {
    return {
      el: null,
      message: '',
      duration: 3000,
      icon: 'info',
      type: 'primary',
      spin: false
    }
  },
  mounted () {
    this.el = this.$refs.message
    this.show()
  },
  methods: {
    show () {
      this.el.style.display = 'block'
      setTimeout(() => {
        this.el.setAttribute('visible', 'true')
        if (this.duration) {
          this.hide()
        }
      }, 20)
    },
    hide () {
      setTimeout(() => {
        this.el.removeAttribute('visible')
        setTimeout(() => {
          this.el.style.display = 'none'
          this.el.parentNode.removeChild(this.el)
        }, 300)
      }, this.duration)
    },
    renderIcon () {
      if (!this.icon) return
      const {icon, spin} = this
      return (
        <Icon name={icon} spin={spin}/>
      )
    }
  },
  render (h) {
    const {type} = this
    return (
      <div
        class={style['message']}
        ref="message"
        type={type}
      >
        <div class={style['message-content']}>
          <span class={style['message-icon']}>
            {this.renderIcon()}
          </span>
          <span class={style['message-label']}>{this.message}</span>
        </div>
      </div>
    )
  }
}