import './date-picker.css';
import style from './date-picker.css.json'
import Popover from '../../popover/src/popover'
import Icon from '../../icon/src/icon'
import Input from '../../input/src/input'
import D from '../../../utils/date'
import {format, addYears, addMonths, getYear, getMonth, subMonths, eachWeekOfInterval, subYears} from 'date-fns'
export default {
  name: 'm-date-picker',
  props: {
    value: {
      type: String | Array,
      default: ''
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
    }
  },
  data () {
    return {
      dft: this.value,
      base: null,
      current: null,
      dataArray: []
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
  },
  methods: {
    onRangeChange (v) {
      this.getCurrent()
    },
    onPrevYear (index) {
      const {type, current, fmt} = this
      const d = type === 'year' ? 15 : 1
      current.forEach((item, idx) => {
        const nv = format(subYears(new Date(item), d), fmt[type])
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
        const nv = format(subMonths(new Date(item), 1), fmt[type])
        this.current[idx] = nv
        this.$forceUpdate()
      })
      this.getDataArray()
    },
    onNextMonth (index) {
      const {type, current, fmt} = this
      current.forEach((item, idx) => {
        const nv = format(addMonths(new Date(item), 1), fmt[type])
        this.current[idx] = nv
        this.$forceUpdate()
      })
      this.getDataArray()
    },
    onNextYear (index) {
      let {type, current, fmt} = this
      const d = type === 'year' ? 15 : 1
      current.forEach((item, idx) => {
        const nv = format(addYears(new Date(item), d), fmt[type])
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
      if (this.type.indexOf('date') < 0) return
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
    renderHeadYear (year, index) {
      if (this.type === 'year') {
        let start = this.dataArray[index]
        start = format(start[0], 'yyyy')
        return (
          <p class={style['date-head-item']}>
            <span class={style['date-head-label']}>{start}年</span>
            <Icon name="caret-down" size="10"/>
          </p>
        )
      } else if (this.type === 'week') {
        return (
          <p class={style['date-head-item']}>
            <span class={style['date-head-label']}>{year}年</span>
          </p>
        )
      } else if (this.type === 'time') {
        return (
          <p class={style['date-head-item']}>
            <span class={style['date-head-label']}>请选择时间</span>
          </p>
        )
      } else {
        return (
          <p class={style['date-head-item']}>
            <span class={style['date-head-label']}>{year}年</span>
            <Icon name="caret-down" size="10"/>
          </p>
        )
      }
    },
    renderHeadMonth (month, index) {
      if (this.type === 'month' || this.type === 'time' || this.type === 'quart') return
      if (this.type === 'year') {
        let end = this.dataArray[index]
        end = format(end[end.length - 1], 'yyyy')
        return (
          <p class={style['date-head-item']}>
            <span class={style['date-head-label']}>{end >= 10 ? end : `0${end}`}月</span>
            <Icon name="caret-down" size="10"/>
          </p>
        )
      } else if (this.type === 'week') {
        return (
          <p class={style['date-head-item']}>
            <span class={style['date-head-label']}>{5}周</span>
          </p>
        )
      } else {
        return (
          <p class={style['date-head-item']}>
            <span class={style['date-head-label']}>{month >= 10 ? month : `0${month}`}月</span>
            <Icon name="caret-down" size="10"/>
          </p>
        )
      }
    },
    renderHead (index) {
      let date = new Date(this.current[index])
      if (this.type === 'week') {
        date = this.parseWeekToDate(this.current[index])
      }
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return (
        <div class={style['date-head']}>
          <div class={style['date-head-prefix']}>
            {this.renderPrevYear(index)}
            {this.renderPrevMonth(index)}
          </div>
          <div class={style['date-head-content']}>
            {this.renderHeadYear(year, index)}
            {this.renderHeadMonth(month, index)}
          </div>
          <div class={style['date-head-suffix']}>
            {this.renderNextMonth(index)}
            {this.renderNextYear(index)}
          </div>
        </div>
      )
    },
    renderMonthDay (index) {
      const {dataArray} = this
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
                      return (
                        <li class={style['date-item']}>
                          <div class={style['date-day']}>
                            <p class={style['date-value']}>{day}</p>
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
    renderYear (index) {
      const {dataArray} = this
      return (
        <ul class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const date = new Date(item)
              const year  = date.getFullYear()
              return (
                <li>
                  <p>{year}年</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    renderMonth (index) {
      const {dataArray} = this
      return (
        <ul class={style['date-list']}>
          {
            dataArray[index].map((item) => {
              const date = new Date(item)
              const month  = date.getMonth() + 1
              return (
                <li>
                  <p>{month}月</p>
                </li>
              )
            })
          }
        </ul>
      )
    },
    renderWeek (index) {
      const {dataArray} = this
      console.log(dataArray)
    },
    renderContent (index) {
      const {type} = this
      if (type.indexOf('date') >= 0) {
        return this.renderMonthDay(index)
      } else if (type === 'year') {
        return this.renderYear(index)
      } else if (type === 'month') {
        return this.renderMonth(index)
      } else if (type === 'week') {
        return this.renderWeek(index)
      }
    },
    renderCore () {
      const {dataArray} = this
      return dataArray.map((data, i) => {
        return (
          <div class={style['date-panel']}>
            {this.renderHead(i)}
            {this.renderContent(i)}
          </div>
        )
      })
    },
    getDataArray () {
      let array = []
      const {current, type} = this
      current.forEach(item => {
        let data = null
        if (type.indexOf('date') >= 0) {
          data = D.thisFullMonthDays(new Date(item))        
        } else if (type === 'year') {
          data = D.latest15Years(new Date(item))
        } else if (type === 'month') {
          data = D.thisYearMonths(new Date(item))
        } else if (type === 'week') {
          data = D.thisWeekMonth(item)
        } else if (type === 'time') {
          data = this.timeArray.length ? this.timeArray : D.timeData()
        } else if (type === 'quart') {
          data = D.quartData()
        }
        array.push(data)
      })
      this.dataArray = array
    },
    getDefault (d) {
      const {type, fmt} = this
      let date
      if (type.indexOf('date') >= 0) {
        date = new Date(d)
      } else if (type === 'year') {
        date = new Date(`${d}/1/1`)
      } else if (type === 'month') {
        date = new Date(`${date}/1`)
      } else if (type === 'week') {
        this.parseWeekToDate(d)
      }
      if (!date) return
      this.base = format(date, fmt[type])
    },
    parseWeekToDate (d) {
      const year = d.substring(0, 4)
      const idx = parseInt(d.split('/')[1])
      const arr = eachWeekOfInterval({
        start: new Date(`${year}/1/1`),
        end: new Date(`${year}/12/30`)
      })
      return arr[idx]
    },
    getCurrent () {
      const {type, dft, range, fmt} = this
      let current = null
      if (dft) {
        if (typeof dft === 'string') {
          current = dft
        } else {
          current = dft[0]
        }
        this.getDefault(dft)
      } else {
        const date = new Date()
        current = format(date, fmt[type])
        this.base = current
      }
      if (range) {
        let next = null
        if (type.indexOf('date') >= 0) {
          next = format(addMonths(new Date(current), 1), fmt[type])
        } else if (type === 'year') {
          next = dft[1] ? dft[1] : format(addYears(new Date(current), 15), fmt[type])
        } else if (type === 'month') {
          next = dft[1] ? dft[1] : format(addMonths(new Date(current), 1), fmt[type])
        }
        this.current = next ? [current, next] : [current]
      } else {
        this.current = [current]
      }
    }
  },
  watch: {
    'range': 'onRangeChange',
    'current': 'getDataArray'
  },
  mounted () {

  },
  created () {
    this.getCurrent()
  },
  render (h) {
    return (
      <Popover>
        <Input placeholder={this.placeholder} suffix-icon="date"/>
        <div class={style['date']} slot="content">
          {this.renderCore()}
        </div>
      </Popover>
    )
  }
}