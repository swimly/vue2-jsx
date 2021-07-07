import Vue from 'vue'
import Component from './src/mask'

let Constructor = Vue.extend(Component)
let instance

const show = (options: any) => {
  instance = new Constructor({
    data: options
  })
  document.body.appendChild(instance.$mount().$el)
  return instance
}

const loading = (options: any) => {
  instance = new Constructor({
    data: {
      ...options,
      loading: true,
      click: null
    }
  })
  document.body.appendChild(instance.$mount().$el)
  return instance
}

const hide = () => {
  instance.hide()
}

export default {
  show,
  loading,
  hide
}