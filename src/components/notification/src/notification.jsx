import './notification.css';
import style from './notification.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-notification',
  props: {
  },
  data () {
    return {
      el: null,
      content: null,
      title: '',
      message: '',
      duration: 2000,
      icon: '',
      placement: 'top-right',
      type: 'primary'
    }
  },
  methods: {
    show () {
      this.el.style.display = 'block'
      this.el.style.minHeight = `${this.content.offsetHeight + 16}px`
      setTimeout(() => {
        this.el.style.transition = '0.3s'
        this.el.setAttribute('visible', 'true')
        if (this.duration) {
          this.hide()
        }
      }, 20)
    },
    hide () {
      setTimeout(() => {
        this.el.removeAttribute('visible')
        this.el.style.minHeight = '0px'
        setTimeout(() => {
          this.el.style.display = 'none'
          this.el.parentNode.removeChild(this.el)
        }, 300)
      }, this.duration)
    },
    onClick (e) {
      this.$emit('click', e)
    },
    renderIcon () {
      if (!this.icon) return
      const {icon, type} = this
      return (
        <Icon size="32" type={type} name={icon}/>
      )
    },
    renderClose () {
      if (this.duration) return
      return (
        <Icon onClick={this.hide} name="close" size="14"/>
      )
    }
  },
  mounted () {
    this.el = this.$refs.item
    this.content = this.$refs.content
    this.$nextTick(() => {
      this.show()
    })
  },
  render (h) {
    const {title, message, placement} = this
    return (
      <div
        class={style['m-notification']}
        ref="item"
        placement={placement}
      >
        <div
          class={style['m-notification-content']}
          ref="content"
        >
          <div class={style['m-notification-prefix']}>
            {this.renderIcon()}
          </div>
          <div class={style['m-notification-view']}>
            <div class={style['m-notification-close']}>{this.renderClose()}</div>
            <h2 class={style['m-notification-title']}>{title}</h2>
            <p class={style['m-notification-label']}>{message}</p>
          </div>
        </div>
      </div>
    )
  }
}