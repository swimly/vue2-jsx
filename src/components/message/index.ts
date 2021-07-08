import Vue from 'vue'
import Component from './src/message'
import pkg from '../../../package.json'

let Constructor = Vue.extend(Component)
let instance

const wrapdom = () => {
  let wrap = document.querySelector(`.${pkg.prefix}-message-group`) as HTMLElement
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = `${pkg.prefix}-message-group`
    wrap.style.position="fixed"
    wrap.style.top = '5%'
    wrap.style.left = '50%'
    wrap.style.width = 'auto'
    wrap.style.transform = `translateX(-50%)`
    wrap.style.zIndex = '1000'
    document.body.appendChild(wrap)
  }
  return wrap
}

const show = (options = {}) => {
  let option = typeof options === 'string' ? {
    message: options
  } : options
  instance = new Constructor({
    data: option
  })
  wrapdom().appendChild(instance.$mount().$el)
}

const types = (message, type, icon, other) => {
  let option = {
    message,
    type,
    icon,
    ...other
  }
  instance = new Constructor({
    data: option
  })
  wrapdom().appendChild(instance.$mount().$el)
  return instance
}

const hide = () => {
  instance.hide()
}

export default {
  show,
  success: (message) => types(message, 'success', 'success', {}),
  warning: (message) => types(message, 'warning', 'info', {}),
  error: (message) => types(message, 'error', 'error', {}),
  loading: (message) => types(message, 'primary', 'loading', {spin: true, duration: 0}),
  hide
}