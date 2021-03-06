import './input.css';
import style from './input.css.json'
import Icon from '../../icon/src/icon'
import Tag from '../../tag/src/tag'
export default {
  name: 'm-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    prefixLabel: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    suffixLabel: {
      type: String,
      default: ''
    },
    prefixColor: {
      type: String,
      default: ''
    },
    suffixColor: {
      type: String,
      default: ''
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    value: {
      type: String | Array,
      default: ''
    },
    maxLength: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      content: this.value,
      $prefix: null,
      $content: null,
      $suffix: null
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    },
    renderPrefix () {
      const {prefixIcon, prefixLabel} = this
      if (prefixIcon) {
        return (<Icon size="16" name={prefixIcon}/>)
      } else if (prefixLabel) {
        return (<span>{prefixLabel}</span>)
      } else {
        return this.$slots.prefix
      }
    },
    renderSuffix () {
      const {suffixIcon, suffixLabel} = this
      if (suffixIcon) {
        return (<Icon size="16" name={suffixIcon}/>)
      } else if (suffixLabel) {
        return (<span>{suffixLabel}</span>)
      } else {
        return this.$slots.suffix
      }
    },
    renderClear () {
      if (!this.allowClear) return
      return (
        <Icon class={style['input-clear']} visible={this.content.length > 0} onClick={this.clear} name="clear" size="16"/>
      )
    },
    clear () {
      this.content = ''
      this.$emit('input', '')
      this.$forceUpdate()
    },
    onChange (e) {
      let v = e.target.value
      this.content = v
      this.$emit('input', v)
    },
    renderCount () {
      if (!this.maxLength) return
      return (
        <span>{this.content.length}/{this.maxLength}</span>
      )
    },
    focus () {
      this.$el.setAttribute('focus', 'true')
    },
    blur () {
      this.$el.removeAttribute('focus')
    },
    rotate (name, rotate) {
      this['$'+`${name}`].setAttribute('rotate', `${rotate}`)
    },
    onValueChange (v) {
      this.content = v
      this.$forceUpdate()
    },
    renderContent () {
      let {type, placeholder, content, onChange, maxLength} = this
      if (typeof content === 'string') {
        return (
          <input
            type={type}
            class={style['input-core']}
            placeholder={placeholder}
            value={content}
            onInput={onChange}
            maxLength={maxLength ? maxLength : ''}
          />
        )
      } else {
        if (content === null) return
        return (
          <div class={style['input-tag']}>
            {
              content.map((item) => {
                return (
                  <Tag onClose={this.onClose.bind(this, item)} size={24} allow-close={true}>{item}</Tag>
                )
              })
            }
          </div>
        )
      }
    },
    onClose (item) {
      const index = this.value.indexOf(item)
      this.value.splice(index, 1)
      this.$emit('input', this.value)
      this.$emit('change', this.value)
    }
  },
  mounted () {
    this.$prefix = this.$refs.prefix
    this.$content = this.$refs.content
    this.$suffix = this.$refs.suffix
  },
  watch: {
    'value': 'onValueChange'
  },
  render (h) {
    const {prefixColor, suffixColor} = this
    return (
      <div
        onFocus={this.focus}
        onBlur={this.blur}
        class={style['input']}
        tabIndex="1"
      >
        <div
          class={style['input-prefix']}
          ref="prefix"
          style={{
            color: prefixColor
          }}
        >
          {this.renderPrefix()}
        </div>
        <div
          class={style['input-content']}
          ref="content"
        >
          {this.renderContent()}
        </div>
        <div
          class={style['input-suffix']}
          ref="suffix"
          style={{
            color: suffixColor
          }}
        >
          {this.renderCount()}
          {this.renderClear()}
          {this.renderSuffix()}
        </div>
      </div>
    )
  }
}