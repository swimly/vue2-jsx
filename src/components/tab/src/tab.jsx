import './tab.css';
import style from './tab.css.json'
import TabBar from './tab-bar'
export default {
  name: 'm-tab',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      children: [],
      active: this.value
    }
  },
  computed: {
    index () {
      let i
      this.children.forEach((item, index) => {
        if (item.name === this.value) {
          i = index
        }
      })
      return i
    }
  },
  mounted () {
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    },
    pushChild (v) {
      this.children.push(v)
    }
  },
  render (h) {
    return (
      <div onClick={this.onClick} class={style['tab']}>
        <div class={style['tab-head']}>
          <div class={style['tab-head-content']}>
            <TabBar position="top" value={this.children} current={this.index}/>
          </div>
          <div class={style['tab-head-suffix']}></div>
        </div>
        <div class={style['tab-content']}>
          <div class={style['tab-wrap']}>{this.$slots.default}</div>
        </div>
      </div>
    )
  }
}