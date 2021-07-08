import './radio.css';
import style from './radio.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-radio',
  inject: ['share'],
  props: {
    icon: {
      type: String,
      default: 'dot'
    },
    size: {
      type: Number,
      default: 18
    },
    value: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (e) {
      this.$emit('update:checked', e.target.checked)
      this.$emit('change', {
        checked: e.target.checked,
        value: this.value,
        label: this.$slots.default
      })
      this.$parent.setValue(this.value)
    }
  },
  data () {
    return {
      isCheck: this.checked
    }
  },
  computed: {
    isChecked () {
      return this.share.values === this.value || this.checked
    },
    frameStyle () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
    coreStyle () {
      return {
        marginRight: `${this.size}px`
      }
    }
  },
  created () {
    if (this.share.values.length) {
      this.isCheck = this.share.values === this.value
    }
    
  },
  render (h) {
    const {icon, size, frameStyle, coreStyle, isChecked, onChange, $slots} = this
    return (
      <div
        class={style['radio']}
        style={coreStyle}
      >
        <input
          type="radio"
          class={style['radio-core']}
          checked={isChecked}
          onChange={onChange}
        />
        <span
          class={style['radio-frame']}
          style={frameStyle}
        >
          <Icon size={size * 0.8} name={icon}/>
        </span>
        <span class={style['radio-label']}>{$slots.default}</span>
      </div>
    )
  }
}