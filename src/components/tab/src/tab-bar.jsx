import './tabbar.css';
import style from './tabbar.css.json'
import $ from '../../../utils'
export default {
  name: 'm-tab-bar',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    current: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: 'top'
    },
    indicateWidth: {
      type: Number,
      default: 20
    },
    adaptWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: this.current,
      $list: null,
      $active: null,
      offset: 0,
      offsetP: null,
      iWidth: this.indicateWidth
    }
  },
  computed: {
    indicateStyle () {
      const {offset, position} = this
      const isH = position === 'top' || position === 'bottom'
      const d = isH ? 'X' : 'Y'
      const s = isH ? 'width' : 'height'
      return {
        transform: `translate${d}(${offset}px)`,
        [s]: `${this.iWidth}px`
      }
    }
  },
  methods: {
    onClick (index, e) {
      this.active = index
      this.$active = e.target.parentNode
      this.$emit('change', {
        current: this.$active,
        index: this.active
      })
      this.$emit('input', index)
    },
    onChange (v) {
      const {offsetP, position} = this
      const {current, index} = v
      const rect = {
        width: current.offsetWidth,
        height: current.offsetHeight
      }
      const oft = $.offset(current)
      const isH = position === 'top' || position === 'bottom'
      this.offset = isH ? oft.left - offsetP.left : oft.top - offsetP.top
      if (this.adaptWidth) {
        this.iWidth = rect[isH ? 'width' : 'height']
      } else {
        this.offset += isH ? rect.width / 2 : rect.height / 2
        this.offset -= this.iWidth / 2
      }
    }
  },
  mounted () {
    this.$list = this.$refs.list
    this.$nextTick(() => {
      this.$active = this.$list.querySelectorAll('li')[this.active]
      this.offsetP = $.offset(this.$list)
      this.$emit('change', {
        current: this.$active,
        index: this.active
      })
    })
  },
  created () {
    this.$on('change', this.onChange)
  },
  render (h) {
    const {value, indicateStyle} = this
    return (
      <div
        class={style['tab-bar']}
        position={this.position}
      >
        <div class={style['tab-bar-indicate']} style={indicateStyle}></div>
        <ul class={style['tab-bar-list']} ref="list">
          {
            value.map((item, idx) => {
              return (
                <li
                  class={style['tab-bar-item']}
                  active={idx === this.active}
                  onClick={this.onClick.bind(this, idx)}
                >
                  <h2 class={style['tab-bar-label']}>{item.label}</h2>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}