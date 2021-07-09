import './tab-item.css';
import style from './tab-item.css.json'
export default {
  name: 'm-tab-item',
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      width: 0
    }
  },
  computed: {
    itemStyle () {
      return {
        width: `${this.width}px`
      }
    }
  },
  created () {
    const {name, label} = this
    const v = {name, label}
    this.$parent.pushChild(v)
  },
  mounted () {
    this.width = this.$parent.$el.offsetWidth
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    return (
      <div
        onClick={this.onClick}
        class={style['tab-item']}
        style={this.itemStyle}
      >
        {this.$slots.default}
      </div>
    )
  }
}