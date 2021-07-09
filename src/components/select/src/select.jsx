import './select.css';
import style from './select.css.json'
import Popover from '../../popover/src/popover'
import Input from '../../input/src/input'
import Scroller from '../../scroller/src/scroller'
export default {
  name: 'm-select',
  provide () {
    return {
      share: this.share
    }
  },
  props: {
    value: {
      type: Array | String,
      default () {
        return ''
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 140
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    },
    onOpen () {
      this.$handle.focus()
      this.$handle.rotate('suffix', 180)
    },
    onClose () {
      this.$handle.blur()
      this.$handle.rotate('suffix', 0)
    },
    setValue (value) {
      if (!this.multiple) {
        this.share.value = value
      } else {
        const index = this.share.value.indexOf(value)
        if (index >= 0) {
          this.share.value.splice(index, 1)
        } else {
          this.share.value.push(value)
        }
      }
      this.$emit('input', this.share.value)
      this.$emit('change', this.share.value)
    }
  },
  data () {
    return {
      $handle: null,
      $pop: null,
      width: 0,
      share: {
        value: this.value,
        multiple: this.multiple
      }
    }
  },
  mounted () {
    this.$handle = this.$refs.handle
    this.$pop = this.$refs.pop
    this.$nextTick(() => {
      this.width = this.$handle.$el.offsetWidth
    })
  },
  computed: {
    trigger () {
      return this.multiple ? 'click' : 'focus'
    }
  },
  created () {
  },
  render (h) {
    return (
      <Popover
        trigger={this.trigger}
        padding={0}
        ref="pop"
        onOpen={this.onOpen}
        onClose={this.onClose}
      >
        <Input value={this.share.value} suffixIcon="arrow-down" ref="handle"/>
        <div
          class={style['select']}
          slot="content"
          style={{
            width: `${this.width}px`,
            height: `${this.height}px`
          }}
        >
          <Scroller onClick={this.setValue}>
            {this.$slots.default}
          </Scroller>
        </div>
      </Popover>
    )
  }
}