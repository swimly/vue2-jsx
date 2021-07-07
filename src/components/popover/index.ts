import Vue from 'vue'
import Component from './src/popover'

let Constructor = Vue.extend(Component)
let instance

const show = (content: any) => {
  instance = new Constructor({
    data: {
      content
    }
  })
  document.body.appendChild(instance.$mount().$el)
  return instance
}

export default {
  show
}