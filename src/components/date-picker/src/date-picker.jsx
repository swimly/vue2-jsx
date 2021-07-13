import './date-picker.css';
import style from './date-picker.css.json'
import Popover from '../../popover/src/popover'
import Icon from '../../icon/src/icon'
import Input from '../../input/src/input'
import Scroller from '../../scroller/src/scroller'
import Button from '../../button/src/button'
import D from '../../../utils/date'
import {format, addYears, addMonths, subMonths, eachWeekOfInterval, subYears, isWithinInterval, min, max, startOfWeek} from 'date-fns'
import { eachMonthOfInterval } from 'date-fns/esm';
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
      default: false
    },
    defaultTime: {
      type: String,
      default: '09:00:00'
    },
    timeHeight: {
      type: Number,
      default: 35
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
      $pop: null,
      t1: 0,
      t2: 0,
      timer: null
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
    /**
     * 上一年
     * @param {*} index 
     */
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
    /**
     * 上一月
     * @param {*} index 
     */
    onPrevMonth (index) {
      const {type, current, fmt} = this
      current.forEach((item, idx) => {
        const nv = format(subMonths(new Date(item), 1), fmt['date'])
        this.current[idx] = nv
        this.$forceUpdate()
      })
      this.getDataArray()
    },
    /**
     * 下一月
     * @param {*} index 
     */
    onNextMonth (index) {
      const {type, current, fmt} = this
      current.forEach((item, idx) => {
        const nv = format(addMonths(new Date(item), 1), fmt['date'])
        this.current[idx] = nv
        this.$forceUpdate()
      })
      this.getDataArray()
    },
    /**
     * 下一年点击
     * @param {*} index 
     */
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
    /**
     * 渲染上一年
     * @param {*} index 
     * @returns 
     */
    renderPrevYear (index) {
      if (this.type === 'time') return
      return (
        <Icon onClick={this.onPrevYear.bind(this, index)} size="12" name="arrow-prev"/>
      )
    },
    /**
     * 渲染上一月
     * @param {*} index 
     * @returns 
     */
    renderPrevMonth (index) {
      if (this.type.indexOf('date') < 0 && this.type.indexOf('week') < 0) return
      return (
        <Icon onClick={this.onPrevMonth.bind(this, index)} size="12" name="arrow-left"/>
      )
    },
    /**
     * 渲染下一月
     * @param {*} index 
     * @returns 
     */
    renderNextMonth (index) {
      if (this.type.indexOf('date') < 0 && this.type.indexOf('week') < 0) return
      return (
        <Icon onClick={this.onNextMonth.bind(this, index)} size="12" name="arrow-right"/>
      )
    },
    /**
     * 渲染下一年
     * @param {*} index 
     * @returns 
     */
    renderNextYear (index) {
      if (this.type === 'time') return
      return (
        <Icon onClick={this.onNextYear.bind(this, index)} size="12" name="arrow-next"/>
      )
    },
    /**
     * 渲染头部中间区域
     * @param {*} index 
     * @returns 
     */
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
    /**
     * 数字处理，小于10自动添加0
     * @param {*} num 
     * @returns 
     */
    parseNum (num) {
      return num >= 10 ? `${num}` : `0${num}`
    },
    /**
     * 渲染头部元素
     * @param {*} value 
     * @param {*} event 
     * @param {*} arrow 
     * @returns 
     */
    renderHeadItem (value, event, arrow) {
      return (
        <p plain={!arrow} onClick={event} class={style['date-head-item']}>
          <span class={style['date-head-label']}>{value}</span>
          <Icon visible={arrow} name="caret-down" size="10"/>
        </p>
      )
    },
    /**
     * 渲染头部
     * @param {*} index 
     * @returns 
     */
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
    /**
     * 渲染星期名称
     * @returns 
     */
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
    /**
     * 判断当前日期是否在选择范围内
     * @param {*} date 
     * @returns 
     */
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
    /**
     * 判断当前日期是否选中
     * @param {*} date 
     * @returns 
     */
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
    /**
     * 将选中的值从小到大排列
     * @param {*} selectValue 
     * @returns 
     */
    sortDate (selectValue) {
      let arr = []
      const type = this.type.indexOf('date') >= 0 ? 'date' : this.type
      selectValue.forEach(item => {
        arr.push(new Date(format(new Date(item), this.fmt[type])))
      })
      return [min(arr), max(arr)]
    },
    /**
     * 渲染日期，星期主表
     * @param {*} index 
     * @returns 
     */
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
                <ul active={atv} value={w} class={style['date-week']} onClick={this.onWeekClick.bind(this, week)}>
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
                      const disabled = `${iy}/${im}` !== `${year}/${month}` && type !== 'week'
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
    /**
     * 范围选择鼠标移过
     * @param {*} date 
     * @param {*} disabled 
     * @returns 
     */
    onOver (date, disabled) {
      if (this.selectValue === null || this.selectValue && this.selectValue.length < 1 || !this.canhover || !this.range || disabled) return
      this.selectValue[1] = format(date, this.fmt[this.type])
      this.$forceUpdate()
    },
    /**
     * 星期点击
     * @param {*} date 
     * @returns 
     */
    onWeekClick (date) {
      const {type, fmt} = this
      if (type !== 'week') return
      this.selectValue = format(date[0], fmt[type])
      this.$forceUpdate()
      this.callback(this.selectValue)
    },
    /**
     * 日期列表点击
     * @param {*} date 
     * @param {*} disabled 
     * @returns 
     */
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
      this.callback(this.selectValue)
    },
    /**
     * 渲染年份列表
     * @param {*} index 
     * @returns 
     */
    renderYear (index) {
      const {dataArray, current, range, selectValue} = this
      const n = `${(new Date()).getFullYear()}`
      const ar = range ? [] : [n]
      const arr = selectValue === null ? ar : typeof selectValue === 'string' ? [selectValue] : selectValue
      let ma, mi
      if (range && selectValue !== null && typeof selectValue === 'object') {
        ma = parseInt(selectValue[0]) > parseInt(selectValue[1]) ? selectValue[0] : selectValue[1]
        mi = parseInt(selectValue[0]) > parseInt(selectValue[1]) ? selectValue[1] : selectValue[0]
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
    /**
     * 年份列表点击事件
     * @param {*} date 
     */
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
      this.callback(this.selectValue)
    },
    /**
     * 渲染月份列表
     * @param {*} index 
     * @returns 
     */
    renderMonth (index) {
      const {dataArray, selectValue, range, type, fmt} = this
      const now = format(new Date(), fmt[type])
      let val
      if (selectValue === null) {
        val = range ? [] : [now]
      } else {
        val = typeof selectValue === 'string' ? [selectValue] : selectValue
      }
      this.selectValue = val
      let ma, mi
      if (range && selectValue !== null && typeof selectValue === 'object' && selectValue.length) {
        let na = []
        this.selectValue.forEach(item => {
          na.push(new Date(`${item}/01`))
        })
        const ari = [min(na), max(na)]
        ma = format(ari[1], fmt[type])
        mi = format(ari[0], fmt[type])
      }
      return (
        <ul type={this.type} class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const month = item.getMonth() + 1
              const value = format(item, fmt[type])
              const active = val.indexOf(value) >= 0
              const isIn = this.isInMonth(item) && !this.mutipleF
              const isStart = value === mi
              const isEnd = value === ma
              return (
                <li
                  active={active}
                  isin={isIn}
                  start={isStart}
                  end={isEnd}
                  onClick={this.onMonthClick.bind(this, item)}
                  onMouseover={this.onOver.bind(this, item, false)}
                >
                  <p>{this.parseNum(month)}月</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    isInMonth (date) {
      if (this.selectValue.length < 2) return
      const arr = []
      this.selectValue.forEach(item => {
        arr.push(new Date(`${item}/01`))
      })
      const arrs = eachMonthOfInterval({
        start: min(arr),
        end: max(arr)
      })
      let strings = []
      const v = format(date, this.fmt[this.type])
      arrs.forEach(item => {
        strings.push(format(item, this.fmt[this.type]))
      })
      return strings.indexOf(v) >= 0
    },
    /**
     * 月份列表点击事件
     * @param {*} date 
     */
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
      this.callback(this.selectValue)
    },
    /**
     * 渲染时分秒
     * @param {*} index 
     * @returns 
     */
    renderTime (index) {
      const {dataArray, selectValue, type, fmt, defaultTime, range, timeHeight} = this
      const now = defaultTime ? defaultTime : format(new Date(), fmt[type])
      let val = selectValue === null ? [now] : typeof selectValue === 'string' ? [selectValue] : selectValue
      if (range && val.length < 2) {
        val.push(now)
      }
      this.selectValue = val
      const cur = val[index]
      const arr =  cur.split(':')
      return dataArray[index].map((group, col) => {
        const i = parseInt(arr[col])
        const top = timeHeight * i
        return (
          <div 
            class={style['date-scroll']}
            style={{
              width: `${100/dataArray[index].length}%`
            }}
          >
            <Scroller step={this.timeHeight} scroll-top={top} onScrollEnd={this.onTimeScroll.bind(this, index, col)}>
              <ul class={style['date-time']}>
                {
                  group.map((item, idx) => {
                    const active = i === idx
                    return (
                      <li active={active}>{this.parseNum(item)}</li>
                    )
                  })
                }
              </ul>
            </Scroller>
          </div>
        )
      })
    },
    /**
     * 监听时间滚动
     * @param {*} col 
     * @param {*} index 
     * @param {*} d 
     */
    onTimeScroll (col, index, d) {
      const {dataArray, selectValue} = this
      const current = d.top / this.timeHeight
      const arr = selectValue[col].split(':')
      arr[index] = this.parseNum(dataArray[col][index][current])
      this.selectValue[col] = arr.join(':')
      this.$forceUpdate()
      this.callback(this.selectValue)
    },
    /**
     * 渲染季度列表
     * @param {*} index 
     * @returns 
     */
    renderQuart (index) {
      const {dataArray, selectValue, fmt, type, current} = this
      const label = ['第一季度', '第二季度', '第三季度', '第四季度']
      const now = new Date()
      const val = selectValue ? selectValue : format(now, fmt[type])
      const c = current[index]
      const year = c.split('/')[0]
      const cyear = val.split('/')[0]
      const q = parseInt(val.split('/')[1])
      return (
        <ul type={this.type} class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const active = year === cyear && q === item
              return (
                <li active={active} onClick={this.onQuartClick.bind(this, year, item)}>
                  <p>{label[item - 1]}</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    /**
     * 季度列表点击事件
     * @param {*} y 
     * @param {*} q 
     */
    onQuartClick (y, q) {
      this.selectValue = `${y}/${this.parseNum(q)}`
      this.$forceUpdate()
      this.callback(this.selectValue)
    },
    /**
     * 渲染中间内容区域
     * @param {*} index 
     * @returns 
     */
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
    /**
     * 渲染底部
     * @param {*} index 
     * @returns 
     */
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
    /**
     * 渲染日期面板
     * @returns 
     */
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
    /**
     * 生成渲染数据
     */
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
    /**
     * 初始化选中值
     */
    initValue () {
      let {type, select, fmt, range} = this
      if (!select) {
        const d = new Date()
        select = format(d, fmt[type])
      } else {
        this.selectValue = select
        this.$emit('input', this.selectValue)
        select = typeof select === 'string' ? select : select[0]
        this.hasValue = true
        this.canhover = false
      }
      this.initCurrent(select)
    },
    /**
     * 初始化渲染模板基础数据
     * @param {*} select 
     */
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
    /**
     * 综合处理返回事件
     * @returns 
     */
    callback (v) {
      const {mutiple, range, canhover, type} = this
      if (mutiple || range && canhover || type === 'time') return
      const fd = typeof v === 'string' ? [v] : v
      this.$emit('input', fd)
      this.$emit('change', fd)
      this.close()
    },
    /**
     * 关闭弹窗
     */
    close () {
      if (!this.$pop) return
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