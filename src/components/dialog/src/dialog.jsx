import './dialog.css';
import style from './dialog.css.json'
import Icon from '../../icon/src/icon'
import Button from '../../button/src/button'
import Mask from '../../mask/index'
export default {
  name: 'm-dialog',
  props: {
  },
  data () {
    return {
      el: null,
      title: '',
      content: '',
      effect: '',
      close: '',
      mask: true,
      buttons: [{
        label: '取消',
        type: 'default',
        outline: true
      }, {
        label: '确定',
        type: 'primary'
      }],
      callback: () => {
        this.hide()
      },
      $mask: null
    }
  },
  mounted () {
    this.el = this.$refs.el
    this.$nextTick(() => {
      this.show()
    })
  },
  methods: {
    show () {
      this.el.style.display = 'block'
      setTimeout(() => {
        this.$mask = Mask.show({
          click: null
        })
        this.el.setAttribute('visible', 'true')
      }, 30)
    },
    hide () {
      this.el.removeAttribute('visible')
      this.$mask.hide()
      setTimeout(() => {
        this.el.parentNode.removeChild(this.el)
      }, 300)
    },
    onClick (e) {
      this.$emit('click', e)
    },
    renderArea () {
      if (!this.close) return 
      return (
        <span>
          <Icon size="14" name={this.close} onClick={this.hide}/>
        </span>
      )
    },
    renderButton () {
      if (!this.buttons) return
      return (
        <div class={style['m-dialog-footer']}>
          {
            this.buttons.map(item => {
              return (
                <Button onClick={this.onButtonClick.bind(this, item)} type={item.type} outline={item.outline}>{item.label}</Button>
              )
            })
          }
        </div>
      )
    },
    onButtonClick (item, e) {
      this.callback(e, item)
    }
  },
  render (h) {
    return (
      <div onClick={this.onClick} class={style['m-dialog']} ref="el" effect={this.effect}>
        <div class={style['m-dialog-head']}>
          <h2 class={style['m-dialog-title']}>{this.title}</h2>
          <div class={style['m-dialog-area']}>
            {this.renderArea()}
          </div>
        </div>
        <div class={style['m-dialog-content']}>{this.content}</div>
        {this.renderButton()}
      </div>
    )
  }
}