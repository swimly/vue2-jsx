import './popover.css';
import style from './popover.css.json'
import $ from '../../../utils'
import Mask from '../../mask/index'
export default {
  name: 'm-popover',
  props: {
    placement: {
      type: String,
      default: 'bottom-left'
    },
    offset: {
      type: Number,
      default: 12
    },
    trigger: {
      type: String,
      default: 'click'
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    labelColor: {
      type: String,
      default: ''
    },
    arrowCenter: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: true
    },
    padding: {
      type: String | Number,
      default: 12
    }
  },
  data () {
    return {
      $parent: null,
      $handle: null,
      $content: null,
      $wrap: null,
      $mask: null,
      $arrow: null,
      oft: null,
      pos: null,
      panel: null
    }
  },
  computed: {
    contentStyle () {
      let style = {}
      const {oft, pos, panel, offset, arrowCenter, $arrow} = this
      if (oft === null || pos === null) {
        return style
      }
      const a = $arrow.offsetWidth
      const h = (a * 3) / 2
      const p = this.placement.split('-')
      if (p[0] === 'bottom') {
        style['top'] = `${oft.top + pos.height + offset}px`
      } else if (p[0] === 'top') {
        style['top'] = `${oft.top - panel.height - offset}px`
      } else if (p[0] === 'left') {
        style['left'] = `${oft.left - panel.width - offset}px`
      } else if (p[0] === 'right') {
        style['left'] = `${oft.left + pos.width + offset}px`
      }
      const isHorizontal = p[0] === 'top' || p[0] === 'bottom'
      if (p[1] === 'left') {
        style['left'] = arrowCenter ? `${oft.left + pos.width/2 - h}px` : `${oft.left}px`
      } else if (p[1] == 'right') {
        style['left'] = arrowCenter ? `${oft.left - panel.width + pos.width/2 + h}px` : `${oft.left - panel.width + pos.width}px`
      } else if (p[1] === 'top') {
        style['top'] = `${oft.top}px`
      } else if (p[1] === 'bottom') {
        style['top'] = `${oft.top - panel.height + pos.height}px`
      } else {
        isHorizontal ? style['left'] = oft.left + pos.width / 2 - panel.width/2 + 'px' : style['top'] = oft.top + pos.height / 2 - panel.height/2 + 'px'
      }
      if (this.backgroundColor && this.labelColor) {
        style['background-color'] = this.backgroundColor
        style['color'] = this.labelColor
      }
      return style
    },
    arrowStyle () {
      let style = {}
      if (this.type || this.backgroundColor) {
        style['box-shadow'] = `0 0 0 rgba(0, 0, 0, 0)`
      }
      return style
    }
  },
  methods: {
    initEvent (e) {
      this.$emit('click', e)
      this.init()
      this.show()
    },
    show () {
      this.$content.style.display = 'inline-block'
      this.panel = this.$content.getBoundingClientRect()
      setTimeout(() => {
        if (this.trigger === 'click') {
          this.$mask = Mask.show({
            background: 'rgba(0,0,0,0)',
            click: () => {
              if (!this.clickable) return
              this.$mask.hide()
              this.hide()
            }
          })
        }
        this.$content.setAttribute('visible', 'true')
        this.$emit('open')
      }, 20)
    },
    hide () {
      if (this.$mask) {
        this.$mask.hide()
      }
      this.$content.removeAttribute('visible')
      this.$emit('close')
      setTimeout(() => {
        this.$content.style.display = 'none'
      }, 300)
    },
    getOffsetParent (el) {
      const parent = el.parentNode
      const overflow = this.getStyle(parent, 'overflow')
      if (overflow !== 'auto') {
        this.getOffsetParent(parent)
      } else {
        this.$parent = parent
      }
    },
    getStyle (obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr]
      } else {
        return getComputedStyle(obj, false)[attr]
      }
    },
    init () {
      this.$wrap = document.createElement('div')
      this.$wrap.style.position = 'absolute'
      this.$wrap.style.top = '0px'
      this.$wrap.style.left = '0px'
      this.$wrap.style.zIndex = '1001'
      this.$wrap.appendChild(this.$content)
      this.$parent.appendChild(this.$wrap)
      this.oft = $.offset(this.$handle)
      this.pos = this.$handle.getBoundingClientRect()
    }
  },
  mounted () {
    this.getOffsetParent(this.$el)
    this.$handle = this.$refs.handle
    this.$content = this.$refs.content
    this.$arrow = this.$refs.arrow
    let event = this.trigger === 'hover' ? 'mouseenter' : this.trigger
    let timer = null
    this.$content.style.padding = `${this.padding}px`
    if (event === 'focus') {
      this.$handle.addEventListener('click', () => {
        this.$handle.focus()
      })
      this.$handle.addEventListener('blur', () => {
        this.hide()
      })
    }
    this.$handle.addEventListener(event, () => {
      this.initEvent()
    })
    if (event === 'mouseenter') {
      this.$handle.addEventListener('mouseleave', () => {
        timer = setTimeout(() => {
          this.hide()
        }, 100)
      })
      this.$content.addEventListener('mouseenter', () => {
        clearTimeout(timer)
      })
      this.$content.addEventListener('mouseleave', () => {
        this.hide()
      })
    }
  },
  render (h) {
    return (
      <div
        class={style['popover']}
        ref="el"
      >
        <div
          class={style['popover-handle']}
          ref="handle"
          tabIndex="1"
        >{this.$slots.default}</div>
        <div
          class={style['popover-panel']}
          ref="content"
          style={this.contentStyle}
          placement={this.placement}
          type={this.type}
        >
          <div class={style['popover-arrow']} style={this.arrowStyle} ref="arrow"></div>
          <h2 class={style['popover-title']}>
            {this.$slots.title ? this.$slots.title : this.title}
          </h2>
          <div
            class={style['popover-content']}
          >
            {this.$slots.content ? this.$slots.content : this.content}
          </div>
        </div>
      </div>
    )
  }
}