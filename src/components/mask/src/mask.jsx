import './mask.css';
import style from './mask.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-mask',
  props: {
  },
  data () {
    return {
      el: null,
      content: '',
      loading: false,
      background: '',
      click: () => {
        this.hide()
      }
    }
  },
  computed: {
    style () {
      return {
        backgroundColor: this.background
      }
    }
  },
  mounted () {
    this.el = this.$refs.el
    this.$nextTick(() => {
      this.show()
    })
  },
  methods: {
    onClick (e) {
      if (!this.click) return
      this.click()
      this.$emit('click', e)
    },
    show () {
      this.el.style.display = 'block'
      setTimeout(() => {
        this.el.setAttribute('visible', 'true')
      }, 30)
    },
    hide () {
      this.el.removeAttribute('visible')
      setTimeout(() => {
        this.el.parentNode.removeChild(this.el)
      }, 300)
    },
    renderLoading () {
      if (!this.loading) return 
      return (
        <div class={style['m-mask-loading']}>
          <Icon size="32" name="loading" spin/>
          <p>
            {this.content ? this.content : this.$slots.default}
          </p>
        </div>
      )
    }
  },
  render (h) {
    return (
      <div
        onClick={this.onClick}
        class={style['m-mask']}
        ref="el"
        style={this.style}
      >
        {this.renderLoading()}
      </div>
    )
  }
}