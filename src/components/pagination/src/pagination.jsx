import './pagination.css';
import style from './pagination.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-pagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    },
    itemCount: {
      type: Number,
      default: 7
    }
  },
  data () {
    return {
      current: this.currentPage
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.total / this.pageSize)
    },
    pageArray () {
      const length = this.pageCount
      const first = this.itemCount / 2 + 1
      const last = length - (this.itemCount / 2)
      let newArray = []
      const array = Array.from(Array(length), (v,k) =>k + 1)
      if (this.current < first) {
        newArray = [...array.slice(0, this.itemCount - 1), 'next' , array[array.length - 1]]
      } else if (this.current > last) {
        newArray = [array[0], 'prev', ...array.slice(-(this.itemCount - 1))]
      } else {
        const index = array.indexOf(this.current)
        const hl = (this.itemCount - 3)/2
        const start = index - hl
        newArray = [array[0], 'prev', ...array.splice(start, this.itemCount - 2), 'next', array[array.length - 1]]
      }
      return newArray
    }
  },
  methods: {
    onJump (value) {
      let v = typeof value === 'number' ? value : parseInt(value.target.value)
      v = v > this.pageCount ? this.pageCount : v < 1 ? 1 : v
      if (isNaN(v)) {
        v = 1
      }
      this.current = v
    },
    onChoice (item) {
      const v = this.itemCount - 2
      this.current = item === 'next' ? this.current + v : this.current - v
      this.current = this.current >= this.pageCount ? this.pageCount : this.current <= 1 ? 1 : this.current
    },
    onNext () {
      this.current = this.current < this.pageCount ? this.current + 1 : this.pageCount
    },
    onPrev () {
      this.current = this.current > 1 ? this.current - 1 : 1
    },
    renderPrevButton () {
      return (
        <span class={style['pagination-button']} onClick={this.onPrev}>
          <Icon size="16" name="arrow-left"/>
          <span>{this.prevText}</span>
        </span>
      )
    },
    renderNextButton () {
      return (
        <span class={style['pagination-button']} onClick={this.onNext}>
          <Icon size="16" name="arrow-right"/>
          <span>{this.nextText}</span>
        </span>
      )
    },
    renderNumberContent (item) {
      const icon = `arrow-${item}`
      if (typeof item !== 'string') {
        return (
          <span onClick={this.onJump.bind(this, item)}>{item}</span>
        )
      } else {
        return (
          <span onClick={this.onChoice.bind(this, item)}>
            <Icon name="more" size="14"/>
            <Icon name={icon} size="14"/>
          </span>
        )
      }
    },
    renderNumbers () {
      const {pageArray} = this
      return pageArray.map(item => {
        return (
          <span class={style['pagination-item']} active={this.current === item}>
            {
              this.renderNumberContent(item)
            }
          </span>
        )
      })
    }
  },
  render (h) {
    return (
      <div class={style['pagination']}>
        {this.renderPrevButton()}
        {this.renderNumbers()}
        {this.renderNextButton()}
        <span class={style['pagination-label']}>
          <span>共：{this.total}条</span>
        </span>
        <span class={style['pagination-label']}>
          <span>{this.pageSize}条/页</span>
        </span>
        <input value={this.current} type="text" onInput={this.onJump} class={style['pagination-input']}/>
      </div>
    )
  }
}