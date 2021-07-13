import './scroller.css';
import style from './scroller.css.json'
import $ from '../../../utils'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  name: 'm-scroller',
  props: {
    scrollLeft: {
      type: Number,
      default: 0
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      $content: null,
      width: 0,
      scrollWidth: 0,
      height: 0,
      scrollHeight: 0,
      scrollleft: this.scrollLeft,
      scrolltop: this.scrollTop,
      show: false,
      timer: null,
      t1: {
        top: 0,
        left: 0
      },
      t2: {
        top: 0,
        left:0
      }
    }
  },
  methods: {
    init () {
      const {$content} = this
      this.width = $content.parentNode.offsetWidth
      this.height = $content.parentNode.offsetHeight
      this.scrollWidth = $content.scrollWidth
      this.scrollHeight = $content.scrollHeight
    },
    renderBarX () {
      const {width, scrollWidth} = this
      if (!width || scrollWidth - width <= 1) return
      let s = {}
      const scale = width / scrollWidth
      const barSize = width * scale
      const max = width - barSize
      const maxC = scrollWidth - width
      const mscale = this.scrollleft / maxC
      s['width'] = `${barSize}px`
      s['transform'] = `translateX(${max * mscale}px)`
      return (
        <div style={s} class={style['scroller-bar']} type="x"></div>
      )
    },
    renderBarY () {
      const {height, scrollHeight} = this
      if (!height || height >= scrollHeight) return
      let s = {}
      const scale = height / scrollHeight
      const barSize = height * scale
      const max = height - barSize
      const maxC = scrollHeight - height
      const mscale = this.scrolltop / maxC
      s['height'] = `${barSize}px`
      s['transform'] = `translateY(${max * mscale}px)`
      return (
        <div style={s} class={style['scroller-bar']} type="y"></div>
      )
    },
    onScroll () {
      this.scrollleft = this.$content.scrollLeft
      this.scrolltop = this.$content.scrollTop
      clearTimeout(this.timer)
      this.t1 = {
        top: this.$content.scrollTop,
        left: this.$content.scrollLeft
      }
      this.timer = setTimeout(() => {
        this.t2 = {
          left: this.$content.scrollLeft,
          top: this.$content.scrollTop
        }
        if (this.t1.left === this.t2.left && this.t1.top === this.t2.top) {
          if (this.step) {
            const sy = Math.round(this.t2.top / this.step)
            const sx = Math.round(this.t2.left / this.step)
            this.$content.scrollTop = sy * this.step
            this.$content.scrollLeft = sx * this.step
            this.$emit('scrollEnd', {
              top: sy * this.step,
              left: sx * this.step
            })
          } else {
            this.$emit('scrollEnd', this.t2)
          }
        }
      }, 100)
      this.$emit('update:scrollLeft', this.scrollleft)
      this.$emit('update:scrollTop', this.scrolltop)
      this.$emit('scroll', {
        left: this.scrollleft,
        top: this.scrolltop
      })
    },
    onClick (data) {
      this.$emit('click', data)
    }
  },
  computed: {
    scrollBarWidth () {
      return $.getScrollBarWidth()
    },
    contentStyle () {
      const {scrollBarWidth} = this
      return {
        marginRight: `${-scrollBarWidth}px`,
        marginBottom: `${-scrollBarWidth}px`
      }
    }
  },
  mounted () {
    this.$content = this.$refs.content
    const erd = elementResizeDetectorMaker({
      strategy: 'object',
      callOnAdd: true
    })
    erd.listenTo(this.$refs.content.childNodes[0], (el) => {
      if (!this.scrollBarWidth) return
      this.init()
      if (this.scrollTop) {
        this.$content.scrollTop = this.scrollTop
      }
      if (this.scrollLeft) {
        this.$content.scrollLeft = this.scrollLeft
      }
    })
  },
  render (h) {
    return (
      <div
        class={style['scroller']}
        visible={this.show}
      >
        <div
          class={style['scroller-content']}
          style={this.contentStyle}
          ref="content"
          onScroll={this.onScroll}
        >
          <div>{this.$slots.default}</div>
        </div>
        {this.renderBarY()}
        {this.renderBarX()}
      </div>
    )
  }
}