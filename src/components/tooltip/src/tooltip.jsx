import './tooltip.css';
import style from './tooltip.css.json'
import Popover from '../../popover/src/popover'
export default {
  name: 'm-tooltip',
  props: {
    content: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom-left'
    },
    type: {
      type: String,
      default: 'dark'
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    labelColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    const {placement, content, type, trigger, backgroundColor, labelColor} = this
    return (
      <Popover
        trigger={trigger}
        placement={placement}
        type={type}
        backgroundColor={backgroundColor}
        labelColor={labelColor}
      >
        {this.$slots.default}
        <p class={style['tooltip']} slot="content">{content}</p>
      </Popover>
    )
  }
}