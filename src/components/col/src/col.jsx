import './col.css';
import style from './col.css.json'
export default {
  name: 'm-col',
  inject: ['type', 'gutter', 'valign'],
  props: {
    span: {
      type: Number | String,
      default: 24
    }
  },
  computed: {
    colWidth () {
      let {span, gutter} = this
      span = typeof span === 'string' ? parseInt(span) : span
      return {
        width: `${100 / 24 * span}%`,
        padding: `${gutter}px`
      }
    }
  },
  methods: {
  },
  created () {
  },
  render (h) {
    const {valign, colWidth} = this
    return (
      <div
        class={style['m-col']}
        valign={valign}
        style={colWidth}
      >
        {this.$slots.default}
      </div>
    )
  }
}