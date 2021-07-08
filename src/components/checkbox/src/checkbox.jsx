import './checkbox.css';
import style from './checkbox.css.json'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-checkbox',
  inject: ['share'],
  props: {
    icon: {
      type: String,
      default: 'check'
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
      this.$parent.setValue(this.value, e.target.checked)
    }
  },
  data () {
    return {
      isCheck: this.checked
    }
  },
  computed: {
    isChecked () {
      return this.isCheck
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
      this.isCheck = this.share.values.indexOf(this.value) >= 0
    }
    
  },
  render (h) {
    const {icon, size, frameStyle, coreStyle, isChecked, onChange, $slots} = this
    return (
      <div
        class={style['checkbox']}
        style={coreStyle}
      >
        <input
          type="checkbox"
          class={style['checkbox-core']}
          checked={isChecked}
          onChange={onChange}
        />
        <span
          class={style['checkbox-frame']}
          style={frameStyle}
        >
          <Icon size={size * 0.8} name={icon}/>
        </span>
        <span class={style['checkbox-label']}>{$slots.default}</span>
      </div>
    )
  }
}