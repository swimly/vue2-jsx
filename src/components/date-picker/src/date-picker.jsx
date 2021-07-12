import './date-picker.css';
import style from './date-picker.css.json'
import Popover from '../../popover/src/popover'
import Icon from '../../icon/src/icon'
import Input from '../../input/src/input'
import Scroller from '../../scroller/src/scroller'
import Button from '../../button/src/button'
import D from '../../../utils/date'
import {format, addYears, addMonths, getYear, getMonth, subMonths, eachWeekOfInterval, subYears, isWithinInterval, min, max} from 'date-fns'
export default {
  name: 'm-date-picker',
  props: {
    value: {
      type: String | Array,
      default: null
    },
    range: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    type: {
      type: String,
      default: 'date'
    },
    timeArray: {
      type: Array,
      default () {
        return []
      }
    },
    startWeek: {
      type: Number,
      default: 1
    },
    allowFooter: {
      type: Boolean,
      default: true
    },
    mutiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      select: this.value,
      current: null,
      selectValue: null,
      dataArray: [],
      hasValue: false,
      canhover: true
    }
  },
  computed: {
    fmt () {
      return {
        date: 'yyyy/MM/dd',
        datetime: 'yyyy/MM/dd hh:mm:ss',
        year: 'yyyy',
        month: 'yyyy/MM',
        time: 'hh:mm:ss',
        week: 'yyyy/II',
        quart: 'yyyy/qq'
      }
    },
    timeTip () {
      return this.range ? ['请选择时间'] : ['请选择开始时间', '请选择结束时间']
    },
    banner () {
      let b = ['日', '一', '二', '三', '四', '五', '六']
      const {type} = this
      if (type.indexOf('date') >= 0 || type === 'week') {
        const prev = b.splice(0, this.startWeek)
        b = [...b, ...prev]
      } else if (type === 'time') {
        b = ['时', '分', '秒']
      } else {
        b = []
      }
      return b
    }
  },
  methods: {
    renderPopYear (index) {},
    renderPopMonth (index) {},
    renderPopTime (index) {},
    onPrevYear (index) {
      const {type, current, fmt} = this
      const d = type === 'year' ? 15 : 1
      current.forEach((item, idx) => {
        const nv = format(subYears(new Date(item), d), fmt['date'])
        if (type.indexOf('date') >= 0) {
          this.current[idx] = nv
        } else {
          if (idx === index) {
            this.current[idx] = nv
          }
        }
      })
      this.getDataArray()
    },
    onPrevMonth (index) {
      const {type, current, fmt} = this
      current.forEach((item, idx) => {
        const nv = format(subMonths(new Date(item), 1), fmt['date'])
        this.current[idx] = nv
        this.$forceUpdate()
      })
      this.getDataArray()
    },
    onNextMonth (index) {
      const {type, current, fmt} = this
      current.forEach((item, idx) => {
        const nv = format(addMonths(new Date(item), 1), fmt['date'])
        this.current[idx] = nv
        this.$forceUpdate()
      })
      this.getDataArray()
    },
    onNextYear (index) {
      let {type, current, fmt} = this
      const d = type === 'year' ? 15 : 1
      current.forEach((item, idx) => {
        const nv = format(addYears(new Date(item), d), fmt['date'])
        if (type.indexOf('date') >= 0) {
          this.current[idx] = nv
        } else {
          if (idx === index) {
            this.current[idx] = nv
          }
        }
      })
      this.getDataArray()
    },
    renderPrevYear (index) {
      if (this.type === 'time') return
      return (
        <Icon onClick={this.onPrevYear.bind(this, index)} size="14" name="arrow-prev"/>
      )
    },
    renderPrevMonth (index) {
      if (this.type.indexOf('date') < 0 && this.type.indexOf('week') < 0) return
      return (
        <Icon onClick={this.onPrevMonth.bind(this, index)} size="14" name="arrow-left"/>
      )
    },
    renderNextMonth (index) {
      if (this.type.indexOf('date') < 0 && this.type.indexOf('week') < 0) return
      return (
        <Icon onClick={this.onNextMonth.bind(this, index)} size="14" name="arrow-right"/>
      )
    },
    renderNextYear (index) {
      if (this.type === 'time') return
      return (
        <Icon onClick={this.onNextYear.bind(this, index)} size="14" name="arrow-next"/>
      )
    },
    renderHeadContent (index) {
      const {type, current} = this
      let dates = []
      current.forEach(item => {
        dates.push(new Date(item))
      })
      if (type.indexOf('date') >= 0 || type === 'week') {
        return ['year', 'month'].map(item => {
          if (item === 'year') {
            return this.renderHeadItem(`${dates[index].getFullYear()}年`, this.renderPopYear, true)
          } else {
            return this.renderHeadItem(`${this.parseNum(dates[index].getMonth() + 1)}月`, this.renderPopMonth, true)
          }
        })
      } else if (type === 'year') {
        const {dataArray} = this
        const startY = format(dataArray[index][0], 'yyyy')
        const endY = format(dataArray[index][dataArray[index].length - 1], 'yyyy')
        const arr = [startY, '', endY]
        return arr.map(item => {
          const v = item ? `${item}年` : '-'
          return this.renderHeadItem(v, () => {}, false)
        })
      } else if (type === 'month') {
        return this.renderHeadItem(`${dates[index].getFullYear()}年`, this.renderPopYear, true)
      } else if (type === 'time') {
        return this.renderHeadItem(this.timeTip[index], () => {}, false)
      } else if (type === 'quart') {
        return this.renderHeadItem(`${dates[index].getFullYear()}年`, this.renderPopYear, true)
      }
    },
    parseNum (num) {
      return num >= 10 ? `${num}` : `0${num}`
    },
    renderHeadItem (value, event, arrow) {
      return (
        <p plain={!arrow} onClick={event} class={style['date-head-item']}>
          <span class={style['date-head-label']}>{value}</span>
          <Icon visible={arrow} name="caret-down" size="10"/>
        </p>
      )
    },
    renderHead (index) {
      return (
        <div class={style['date-head']}>
          <div class={style['date-head-prefix']}>
            {this.renderPrevYear(index)}
            {this.renderPrevMonth(index)}
          </div>
          <div class={style['date-head-content']}>
            {this.renderHeadContent(index)}
          </div>
          <div class={style['date-head-suffix']}>
            {this.renderNextMonth(index)}
            {this.renderNextYear(index)}
          </div>
        </div>
      )
    },
    renderBanner () {
      const {banner} = this
      if (!banner.length) return
      return (
        <ul class={style['date-banner']}>
          {
            banner.map(item => {
              return (
                <li>{item}</li>
              )
            })
          }
        </ul>
      )
    },
    isInSelect (date) {
      const {selectValue} = this
      if (selectValue === null || typeof selectValue !== 'object' || selectValue.length < 2 || !this.range) return
      const s = []
      selectValue.forEach(item => {
        s.push(format(new Date(item), 'yyyy/MM/dd'))
      })
      const start = new Date(s[0])
      const end = new Date(s[1])
      const m = min([start, end])
      const mx = max([start, end])
      return isWithinInterval(date, {
        start: m,
        end: mx
      })
    },
    isCurrent (date) {
      const {selectValue} = this
      if (selectValue === null || this.type === 'week') return
      const d = typeof selectValue === 'string' ? [selectValue] : selectValue
      const c = format(date, 'yyyy/MM/dd')
      let result = false
      d.forEach(item => {
        const v = format(new Date(item), 'yyyy/MM/dd')
        if (c === v) {
          result = true
        }
      })
      return result
    },
    renderMonthDay (index) {
      const {dataArray, current, range, hasValue, selectValue, type} = this

      const now = selectValue ? new Date(selectValue[index]) : new Date(current[index])
      const ny = now.getFullYear()
      const nm = now.getMonth() + 1
      const nd = now.getDate()

      const t = new Date(current[index])
      const iy = t.getFullYear()
      const im = t.getMonth() + 1

      return (
        <div class={style['date-month']}>
          {
            dataArray[index].map((week, idx) => {
              return (
                <ul class={style['date-week']}>
                  {
                    week.map((item, index) => {
                      const date = new Date(item)
                      const day = date.getDate()
                      const month = date.getMonth() + 1
                      const year = date.getFullYear()
                      const active = !range && ny === year && nm === month && nd === day
                      const isCurrent = this.isCurrent(date)
                      const isIn = this.isInSelect(date)
                      const disabled = `${iy}/${im}` !== `${year}/${month}`
                      return (
                        <li
                          active={active && !hasValue}
                          current={isCurrent}
                          disabled={disabled}
                          isin={isIn}
                          class={style['date-item']}
                          onClick={this.onDateClick.bind(this, date)}
                          onMouseover={this.onDateOver.bind(this, date)}
                        >
                          <div class={style['date-day']}>
                            <p
                              class={style['date-value']}
                            >{day}</p>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              )
            })
          }
        </div>
      )
    },
    onDateOver (date) {
      if (this.selectValue === null || this.selectValue && this.selectValue.length < 1 || !this.canhover || !this.range) return
      this.selectValue[1] = format(date, 'yyyy/MM/dd')
      this.$forceUpdate()
    },
    onDateClick (date) {
      let {mutiple, range, type, fmt, selectValue} = this
      this.selectValue = selectValue === null ? [] : typeof selectValue === 'string' ? [selectValue] : selectValue
      const v = format(date, fmt[type])
      if (range) {
        if (!this.canhover) {
          this.selectValue = [v]
          this.canhover = true
        }
        if (this.selectValue.length === 0) {
          this.selectValue.push(v)
        } else if (this.selectValue.length === 2) {
          this.canhover = false
        }
      } else if (mutiple) {
        this.selectValue.push(v)
      } else {
        this.selectValue = [v]
      }
      this.hasValue = true
      this.$forceUpdate()
    },
    renderYear (index) {
      const {dataArray, current, range, selectValue} = this
      const arr = selectValue === null ? [`${(new Date()).getFullYear()}`] : typeof selectValue === 'string' ? [selectValue] : selectValue
      return (
        <ul type={this.type} class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const date = new Date(item)
              const year  = `${date.getFullYear()}`
              const isIn = this.isInSelect(date)
              const active = arr.indexOf(year) >= 0
              return (
                <li
                  isin={isIn}
                  active={active}
                  onClick={this.onYearClick.bind(this, date)}
                >
                  <p>{year}年</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    onYearClick (date) {
      const {range, fmt, type} = this
      if (!range) {
        this.selectValue = format(date, fmt['date'])
      }
      this.$forceUpdate()
      console.log(this.selectValue)
    },
    renderMonth (index) {
      const {dataArray, current} = this
      const now = new Date(current[index])
      const nm = now.getMonth() + 1
      return (
        <ul type={this.type} class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const date = new Date(item)
              const month  = date.getMonth() + 1
              const active = nm === month
              return (
                <li active={active}>
                  <p>{this.parseNum(month)}月</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    renderTime (index) {
      const {dataArray} = this
      return dataArray[index].map((group, col) => {
        return (
          <div 
            class={style['date-scroll']}
            style={{
              width: `${100/dataArray[index].length}%`
            }}
          >
            <Scroller>
              <ul class={style['date-time']}>
                {
                  group.map((item, idx) => {
                    return (
                      <li>{this.parseNum(item)}</li>
                    )
                  })
                }
              </ul>
            </Scroller>
          </div>
        )
      })
    },
    renderQuart (index) {
      const {dataArray} = this
      const label = ['第一季度', '第二季度', '第三季度', '第四季度']
      return (
        <ul type={this.type} class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              return (
                <li>
                  <p>{label[item - 1]}</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    renderContent (index) {
      const {type} = this
      if (type.indexOf('date') >= 0 || type === 'week') {
        return this.renderMonthDay(index)
      } else if (type === 'year') {
        return this.renderYear(index)
      } else if (type === 'month') {
        return this.renderMonth(index)
      } else if (type === 'time') {
        return this.renderTime(index)
      } else if (type === 'quart') {
        return this.renderQuart(index)
      }
    },
    renderFooterPrefix (index) {},
    renderFooterSuffix (index) {
      return (
        <div>
          <Button type="default" outline>取消</Button>
          <Button>确定</Button>
        </div>
      )
    },
    renderFooter (index) {
      return (
        <div class={style['date-footer']}>
          <div class={style['date-footer-item']}>
            {this.renderFooterPrefix(index)}
          </div>
          <div class={style['date-footer-item']}>
            {this.renderFooterSuffix(index)}
          </div>
        </div>
      )
    },
    renderCore () {
      const {dataArray} = this
      return dataArray.map((data, i) => {
        return (
          <div class={style['date-panel']}>
            {this.renderHead(i)}
            {this.renderBanner()}
            <div class={style['date-content']}>
              {this.renderContent(i)}
            </div>
            {this.renderFooter(i)}
          </div>
        )
      })
    },
    getDataArray () {
      let array = []
      const {current, type} = this
      current.forEach(item => {
        let data = null
        if (type.indexOf('date') >= 0 || type === 'week') {
          data = D.thisFullMonthDays(new Date(item), this.startWeek)        
        } else if (type === 'year') {
          data = D.latest15Years(new Date(item))
        } else if (type === 'month') {
          data = D.thisYearMonths(new Date(item))
        }else if (type === 'time') {
          data = this.timeArray.length ? this.timeArray : D.timeData()
        } else if (type === 'quart') {
          data = D.quartData()
        }
        array.push(data)
      })
      this.dataArray = array
    },
    initValue () {
      let {type, select, fmt, range} = this
      if (!select) {
        const d = new Date()
        select = format(d, fmt[type])
      } else {
        this.selectValue = select
        select = typeof select === 'string' ? select : select[0]
        this.hasValue = true
        this.canhover = false
      }
      this.initCurrent(select)
    },
    initCurrent (select) {
      const {type, fmt, range} = this
      let current = null
      let next = null
      if (type.indexOf('date') >= 0) {
        current = select
        if (range) {
          const c = new Date(current)
          next = format(addMonths(c, 1), fmt[type])
        }
      } else if (type === 'year') {
        current = `${select}/01/01`
        if (range) {
          const c = new Date(current)
          next = this.select && this.select[1] ? format(new Date(`${this.select[1]}/01/01`), fmt['date']) : format(addYears(c, 15), fmt['date'])
        }
      } else if (type === 'month') {
        current = `${select}/01`
        if (range) {
          const c = new Date(current)
          next = this.select && this.select[1] ? format(new Date(`${this.select[1]}/01`), fmt['date']) : format(addMonths(c, 1), fmt['date'])
        }
      } else if (type === 'week') {
        current = this.parseWeekToDate(typeof select === 'string' ? select : select[0])
      } else if (type === 'time') {
        const date = new Date()
        const y = date.getFullYear()
        const m = date.getMonth() + 1
        const d = date.getDate()
        current = `${y}/${m}/${d} ${select}`
        if (range) {
          next = current
        }
      } else if (type === 'quart') {
        const q = ['01/01', '04/01', '07/01', '10/01']
        const arr = select.split('/')
        current = `${arr[0]}/${q[parseInt(arr[1])]}`
      }
      this.current = next ? [current, next] : [current]
    },
    parseWeekToDate (d) {
      const arr = d.split('/')
      const year = arr[0]
      const idx = parseInt(arr[1])
      const result = eachWeekOfInterval({
        start: new Date(`${year}/01/01`),
        end: new Date(`${year}/12/30`)
      }, {
        weekStartsOn: this.startWeek
      })
      return format(result[idx], this.fmt['date'])
    },
    onRangeChange (v) {
      this.initValue()
    },
    callback (v) {
      // console.log(v)
    }
  },
  watch: {
    'range': 'onRangeChange',
    'select': 'initCurrent',
    'current': 'getDataArray',
    'selectValue': 'callback'
  },
  mounted () {

  },
  created () {
    this.initValue()
  },
  render (h) {
    return (
      <div class={style['date']} style={{
      }}>
        <p>{this.select}</p>
        {this.renderCore()}
      </div>
      // <Popover>
      //   <Input placeholder={this.placeholder} suffix-icon="date"/>
      //   <div class={style['date']} slot="content">
      //     {this.renderCore()}
      //   </div>
      // </Popover>
    )
  }
}