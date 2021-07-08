import './popconfirm.css';
import style from './popconfirm.css.json'
import Popover from '../../popover/src/popover'
import Button from '../../button/src/button'
import Icon from '../../icon/src/icon'
export default {
  name: 'm-popconfirm',
  props: {
  },
  data () {
    return {
      el: null
    }
  },
  mounted () {
    this.el = this.$refs.el
  },
  methods: {
    onClick (data) {
      this.$emit('click', data, this)
    },
    hide () {
      this.el.hide()
    }
  },
  render (h) {
    return (
      <Popover placement="top" clickable={false} ref="el">
        {this.$slots.default}
        <div class={style['popconfirm']} slot="content">
          <div class={style['popconfirm-content']}>
            <div class={style['popconfirm-icon']}>
              <Icon name="info" type="primary" size="20"/>
            </div>
            <div class={style['popconfirm-label']}>
              <p>确认要删除？</p>
            </div>
          </div>
          <div class={style['popconfirm-footer']}>
            <Button onClick={this.onClick.bind(this, {label: '取消'})} type="default" outline>取消</Button>
            <Button onClick={this.onClick.bind(this, {label: '确认'})}>确认</Button>
          </div>
        </div>
      </Popover>
    )
  }
}