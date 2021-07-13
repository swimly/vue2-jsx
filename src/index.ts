import MButton from './components/button/src/button'
import MRow from './components/row/src/row'
import MCol from './components/col/src/col'
import MIcon from './components/icon/src/icon'
import MPopover from './components/popover/src/popover'
import MTooltip from './components/tooltip/src/tooltip'
import MPopconfirm from './components/popconfirm/src/popconfirm'
import MCheckbox from './components/checkbox/src/checkbox'
import MCheckboxGroup from './components/checkbox-group/src/checkbox-group'
import MRadio from './components/radio/src/radio'
import MRadioGroup from './components/radio-group/src/radio-group'
import MSwitch from './components/switch/src/switch'
import MInput from './components/input/src/input'
import MSelect from './components/select/src/select'
import MSelectOption from './components/select-option/src/select-option'
import MTag from './components/tag/src/tag'
import MScroller from './components/scroller/src/scroller'
import MTab from './components/tab/src/tab'
import MTabItem from './components/tab-item/src/tab-item'
import MPagination from './components/pagination/src/pagination'
import MDatePicker from './components/date-picker/src/date-picker'
import MPage from './components/page/src/page'

import Message from './components/message/index'
import Notification from './components/notification/index'
import Dialog from './components/dialog/index'
import Mask from './components/mask/index'
import Popover from './components/popover/index'

const components = [
  MPage,
  MDatePicker,
  MPagination,
  MTab,
  MTabItem,
  MTag,
  MScroller,
  MSelect,
  MSelectOption,
  MInput,
  MSwitch,
  MRadio,
  MRadioGroup,
  MCheckbox,
  MCheckboxGroup,
  MPopconfirm,
  MTooltip,
  MPopover,
  MIcon,
  MCol,
  MRow,
  MButton
]

const install = function (Vue) {
  components.forEach(com => {
    Vue.component(com.name, com)
  })
  Vue.prototype.$message = Message
  Vue.prototype.$notification = Notification
  Vue.prototype.$dialog = Dialog
  Vue.prototype.$mask = Mask
  Vue.prototype.$popover = Popover
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}