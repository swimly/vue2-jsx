import './select.css';
import style from './select.css.json'
import Popover from '../../popover/src/popover'
import Input from '../../input/src/input'
export default {
  name: 'm-select',
  provide () {
    return {
      share: this.share
    }
  },
  props: {
    value: {
      type: String | Array,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
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
    }
  },
  data () {
    return {
      $handle: null,
      $pop: null,
      width: 0,
      share: {
        value: this.value
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
  render (h) {
    return (
      <Popover
        padding={0}
        ref="pop"
        onOpen={this.onOpen}
        onClose={this.onClose}
      >
        <Input suffixIcon="arrow-down" ref="handle"/>
        <div
          class={style['select']}
          slot="content"
          style={{
            width: `${this.width}px`
          }}
        >
          {this.$slots.default}
        </div>
      </Popover>
    )
  }
}