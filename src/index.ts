import MButton from './components/button/src/button'
import MRow from './components/row/src/row'
import MCol from './components/col/src/col'
import MIcon from './components/icon/src/icon'
import MPopover from './components/popover/src/popover'

import Message from './components/message/index'
import Notification from './components/notification/index'
import Dialog from './components/dialog/index'
import Mask from './components/mask/index'
import Popover from './components/popover/index'

const components = [
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