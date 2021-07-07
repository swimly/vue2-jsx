import './popover.css';
import style from './popover.css.json'
import $ from '../../../utils'
import Mask from '../../mask/index'
export default {
  name: 'm-popover',
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    offset: {
      type: Number,
      default: 8
    },
    trigger: {
      type: String,
      default: 'click'
    }
  },
  data () {
    return {
      $parent: null,
      $handle: null,
      $content: null,
      $wrap: null,
      $mask: null,
      oft: null,
      pos: null,
      panel: null
    }
  },
  computed: {
    contentStyle () {
      let style = {}
      const {oft, pos, panel, offset} = this
      if (oft === null || pos === null) {
        return style
      }
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
        style['left'] = `${oft.left}px`
      } else if (p[1] == 'right') {
        style['left'] = `${oft.left - panel.width + pos.width}px`
      } else if (p[1] === 'top') {
        style['top'] = `${oft.top}px`
      } else if (p[1] === 'bottom') {
        style['top'] = `${oft.top - panel.height + pos.height}px`
      } else {
        isHorizontal ? style['left'] = oft.left + pos.width / 2 - panel.width/2 + 'px' : style['top'] = oft.top + pos.height / 2 - panel.height/2 + 'px'
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
              this.$mask.hide()
              this.hide()
            }
          })
        }
        this.$content.setAttribute('visible', 'true')
      }, 20)
    },
    hide () {
      this.$content.removeAttribute('visible')
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
    let event = this.trigger === 'click' ? 'click' : 'mouseenter'
    let timer = null
    this.$handle.addEventListener(event, () => {
      this.initEvent()
    })
    if (event === 'mouseenter') {
      this.$handle.addEventListener('mouseleave', () => {
        timer = setTimeout(() => {
          this.hide()
        }, 300)
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
        class={style['m-popover']}
        ref="el"
      >
        <div
          class={style['m-popover-handle']}
          ref="handle"
        >{this.$slots.default}</div>
        <div
          class={style['m-popover-panel']}
          ref="content"
          style={this.contentStyle}
          placement={this.placement}
        >{this.$slots.content}</div>
      </div>
    )
  }
}