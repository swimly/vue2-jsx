import './date-picker.css';
import style from './date-picker.css.json'
import Popover from '../../popover/src/popover'
import Input from '../../input/src/input'
import D from '../../../utils/date'
import {format, addYears, addMonths} from 'date-fns'
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
    }
  },
  computed: {
    current () {
      const {type, value, range} = this
      let current = null
      const fmt = {
        date: 'yyyy/MM/dd',
        datetime: 'yyyy/MM/dd hh:mm:ss',
        year: 'yyyy',
        month: 'yyyy/MM',
        time: 'hh:mm:ss',
        week: 'yyyy/II',
        quart: 'yyyy/qq'
      }
      if (value) {
        if (typeof value === 'string') {
          current = value
        } else {
          current = value[0]
        }
      } else {
        const date = new Date()
        current = format(date, fmt[type])
      }
      if (range) {
        let next = null
        if (type.indexOf('date') >= 0) {
          next = format(addMonths(new Date(current), 1), fmt[type])
        } else if (type === 'year') {
          next = format(addYears(new Date(current), 15), fmt[type])
        } else if (type === 'month') {
          next = format(addMonths(new Date(current), 1), fmt[type])
        }
        return next ? [current, next] : [current]
      } else {
        return [current]
      }
    },
    dataArray () {
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
      return array
    }
  },
  methods: {
    onRangeChange (v) {
      console.log(this.dataArray)
    },
    renderCore () {
      const {dataArray} = this
      return dataArray.map(data => {
        return (
          <div class={style['date-panel']}>
            
          </div>
        )
      })
    }
  },
  watch: {
    'range': 'onRangeChange'
  },
  mounted () {

  },
  created () {
    console.log(this.dataArray)
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