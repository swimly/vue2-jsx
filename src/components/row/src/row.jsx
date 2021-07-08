import './row.css';
import style from './row.css.json'
export default {
  name: 'm-row',
  provide () {
    return {
      type: this.type,
      gutter: this.gutter,
      valign: this.valign
    }
  },
  computed: {
    rowStyle () {
      const {gutter} = this
      return {
        margin: `${-gutter}px`
      }
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'left'
    },
    valign: {
      type: String,
      default: 'top'
    },
    gutter: {
      type: Number | Array,
      default: 0
    }
  },
  methods: {
  },
  render (h) {
    const {align, valign, type, rowStyle} = this
    return (
      <div
        class={style['row']}
        align={align}
        valign={valign}
        type={type}
        style={rowStyle}
      >
        {this.$slots.default}
      </div>
    )
  }
}