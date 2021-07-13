import './date-picker.css';
import style from './date-picker.css.json'
import Popover from '../../popover/src/popover'
import Icon from '../../icon/src/icon'
import Input from '../../input/src/input'
import Scroller from '../../scroller/src/scroller'
import Button from '../../button/src/button'
import D from '../../../utils/date'
import {format, addYears, addMonths, subMonths, eachWeekOfInterval, subYears, isWithinInterval, min, max, startOfWeek} from 'date-fns'
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
      default: false
    },
    mutiple: {
      type: Boolean,
      default: false
    },
    static: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      select: this.value,
      current: null,
      selectValue: null,
      dataArray: [],
      hasValue: false,
      canhover: true,
      $pop: null
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
        <Icon onClick={this.onPrevYear.bind(this, index)} size="12" name="arrow-prev"/>
      )
    },
    renderPrevMonth (index) {
      if (this.type.indexOf('date') < 0 && this.type.indexOf('week') < 0) return
      return (
        <Icon onClick={this.onPrevMonth.bind(this, index)} size="12" name="arrow-left"/>
      )
    },
    renderNextMonth (index) {
      if (this.type.indexOf('date') < 0 && this.type.indexOf('week') < 0) return
      return (
        <Icon onClick={this.onNextMonth.bind(this, index)} size="12" name="arrow-right"/>
      )
    },
    renderNextYear (index) {
      if (this.type === 'time') return
      return (
        <Icon onClick={this.onNextYear.bind(this, index)} size="12" name="arrow-next"/>
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
    sortDate (selectValue) {
      let arr = []
      const type = this.type.indexOf('date') >= 0 ? 'date' : this.type
      selectValue.forEach(item => {
        arr.push(new Date(format(new Date(item), this.fmt[type])))
      })
      return [min(arr), max(arr)]
    },
    renderMonthDay (index) {
      const {dataArray, current, range, hasValue, selectValue, type, fmt} = this

      const now = selectValue ? new Date(selectValue[index]) : new Date(current[index])
      const ny = now.getFullYear()
      const nm = now.getMonth() + 1
      const nd = now.getDate()

      const t = new Date(current[index])
      const iy = t.getFullYear()
      const im = t.getMonth() + 1
      let wk
      if (type === 'week') {
        const fw = startOfWeek(new Date(), {
          weekStartsOn: this.startWeek
        })
        wk = selectValue ? selectValue : format(fw, fmt[type])
      }
      let ma, mi
      if (range && selectValue !== null && typeof selectValue === 'object') {
        const na = this.sortDate(this.selectValue)
        ma = format(na[1], fmt['date'])
        mi = format(na[0], fmt['date'])
      }
      return (
        <div class={style['date-month']}>
          {
            dataArray[index].map((week, idx) => {
              const w = format(week[0], fmt[type])
              const atv = type === 'week' && wk === w
              return (
                <ul active={atv} value={week} class={style['date-week']} onClick={this.onWeekClick.bind(this, week)}>
                  {
                    week.map((item, index) => {
                      const date = new Date(item)
                      const day = date.getDate()
                      const month = date.getMonth() + 1
                      const year = date.getFullYear()
                      const active = !range && ny === year && nm === month && nd === day
                      const value = format(date, fmt['date'])
                      const isCurrent = this.isCurrent(date)
                      const isIn = this.isInSelect(date)
                      const disabled = `${iy}/${im}` !== `${year}/${month}`
                      const isStart = value === mi
                      const isEnd = value === ma
                      return (
                        <li
                          active={active && !hasValue}
                          current={isCurrent}
                          disabled={disabled}
                          start={isStart}
                          end={isEnd}
                          isin={isIn}
                          class={style['date-item']}
                          onClick={this.onDateClick.bind(this, date, disabled)}
                          onMouseover={this.onOver.bind(this, date, disabled)}
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
    onOver (date, disabled) {
      if (this.selectValue === null || this.selectValue && this.selectValue.length < 1 || !this.canhover || !this.range || disabled) return
      this.selectValue[1] = format(date, this.fmt[this.type])
      this.$forceUpdate()
    },
    onWeekClick (date) {
      const {type, fmt} = this
      if (type !== 'week') return
      this.selectValue = format(date[0], fmt[type])
      this.$forceUpdate()
    },
    onDateClick (date, disabled) {
      let {mutiple, range, type, fmt, selectValue} = this
      if (type === 'week' || disabled) return
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
      this.callback()
    },
    renderYear (index) {
      const {dataArray, current, range, selectValue} = this
      const n = `${(new Date()).getFullYear()}`
      const ar = range ? [] : [n]
      const arr = selectValue === null ? ar : typeof selectValue === 'string' ? [selectValue] : selectValue
      let ma, mi
      if (range && selectValue !== null && typeof selectValue === 'object') {
        ma = parseInt(selectValue[0]) > parseInt(selectValue[1]) ? selectValue[0] : selectValue[1]
        mi = parseInt(selectValue[0]) > parseInt(selectValue[1]) ? selectValue[1] : selectValue[0]
        console.log(mi, ma)
      }
      return (
        <ul type={this.type} class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const date = new Date(item)
              const year  = `${date.getFullYear()}`
              const isIn = this.isInSelect(date)
              const active = arr.indexOf(year) >= 0
              const isStart = `${year}` === mi
              const isEnd = `${year}` === ma
              return (
                <li
                  isin={isIn}
                  start={isStart}
                  end={isEnd}
                  active={active}
                  onClick={this.onYearClick.bind(this, date)}
                  onMouseover={this.onOver.bind(this, date, false)}
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
      const {range, fmt, type, mutiple} = this
      const v = format(date, fmt[type])
      const n = `${(new Date()).getFullYear()}`
      const ar = range ? [] : [n]
      this.selectValue = this.selectValue === null ? ar : typeof this.selectValue === 'string' ? [this.selectValue] : this.selectValue
      if (!range) {
        if (mutiple) {
          this.selectValue.push(v)
        } else {
          this.selectValue = [v]
        }
      } else {
        if (!this.canhover) {
          this.selectValue = [v]
          this.canhover = true
        }
        if (this.selectValue.length < 2) {
          this.selectValue.push(v)
        } else if (this.selectValue.length === 2) {
          this.canhover = false
        }
      }
      this.hasValue = true
      this.$forceUpdate()
      this.callback()
    },
    renderMonth (index) {
      const {dataArray, current, selectValue, range, type, fmt} = this
      const d = new Date()
      const n = `${d.getFullYear()}/${d.getMonth() + 1}`
      const ar = range ? [] : [n]
      const arr = selectValue === null ? ar : typeof selectValue === 'string' ? [selectValue] : selectValue
      let ma, mi
      if (range && selectValue !== null && typeof selectValue === 'object') {
        const na = this.sortDate(this.selectValue)
        ma = format(na[1], fmt[type])
        mi = format(na[0], fmt[type])
        console.log(mi, ma)
      }
      return (
        <ul type={this.type} class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const date = new Date(item)
              const month = date.getMonth() + 1
              const value = format(date, fmt[type])
              const v = format(date, 'yyyy/MM')
              const isIn = this.isInSelect(date)
              const active = this.renderMonthActive(arr, v)
              const isStart = value === mi
              const isEnd = value === ma
              return (
                <li
                  onClick={this.onMonthClick.bind(this, date)}
                  onMouseover={this.onOver.bind(this, date, false)}
                  isin={isIn}
                  active={active}
                  start={isStart}
                  end={isEnd}
                >
                  <p>{this.parseNum(month)}月</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    renderMonthActive (arr, item) {
      let result = false
      arr.forEach(str => {
        if (format(new Date(str), 'yyyy/MM') === item) {
          result = true
        }
      })
      return result
    },
    onMonthClick (date) {
      const {range, fmt, type, mutiple} = this
      const v = format(date, fmt[type])
      const d = new Date()
      const n = `${d.getFullYear()}/${d.getMonth() + 1}`
      const ar = range ? [] : [n]
      this.selectValue = this.selectValue === null ? ar : typeof this.selectValue === 'string' ? [this.selectValue] : this.selectValue
      if (!range) {
        if (mutiple) {
          this.selectValue.push(v)
        } else {
          this.selectValue = [v]
        }
      } else {
        if (!this.canhover) {
          this.selectValue = [v]
          this.canhover = true
        }
        if (this.selectValue.length < 2) {
          this.selectValue.push(v)
        } else if (this.selectValue.length === 2) {
          this.canhover = false
        }
      }
      this.$forceUpdate()
      this.callback()
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
      if (!this.allowFooter) return
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
          next = this.select && this.select[1] ? format(new Date(`${this.select[1]}/01`), fmt['date']) : format(addYears(c, 1), fmt['date'])
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
    callback () {
      const {range, mutiple, allowFooter, canhover} = this
      if (range && !canhover || !range || !range) {
        if (mutiple || canhover) return
        this.$emit('input', this.selectValue)
        this.$emit('change', {
          value: this.selectValue,
          type: this.type,
          format,
          fmt: this.fmt
        })
        console.log('结束')
      }
    },
    close () {
      this.$pop.hide()
    }
  },
  watch: {
    'range': 'onRangeChange',
    'select': 'initCurrent',
    'current': 'getDataArray'
  },
  mounted () {
    this.$pop = this.$refs.pop
  },
  created () {
    this.initValue()
  },
  render (h) {
    if (this.static) {
      return (
        <div class={style['date']} style={{
        }}>
          <p>{this.select}</p>
          {this.renderCore()}
        </div>
      )
    } else {
      return (
        <Popover ref="pop">
          <Input value={this.selectValue} placeholder={this.placeholder} suffix-icon="date"/>
          <div class={style['date']} slot="content">
            {this.renderCore()}
          </div>
        </Popover>
      )
    }
  }
}