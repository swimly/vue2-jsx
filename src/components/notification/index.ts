import Vue from 'vue'
import Component from './src/notification'

let Constructor = Vue.extend(Component)
let instance

const wrapdom = (placement) => {
  let wrap = document.querySelector(`#notification-${placement}`) as HTMLElement
  if (!wrap) {
    const p = placement.indexOf('top') >= 0 ? 'top' : 'bottom'
    const t = placement.indexOf('left') >= 0 ? 'left' : 'right'
    wrap = document.createElement('div');
    wrap.id = `notification-${placement}`
    wrap.style.position = "fixed"
    wrap.style[p] = '50px'
    wrap.style.zIndex = '100'
    wrap.style[t] = '20px'
    document.body.appendChild(wrap)
  }
  return wrap
}

const show = (options: any) => {
  instance = new Constructor({
    data: options
  })
  const wrap = wrapdom(options.placement)
  if (options.placement.indexOf('top') >= 0) {
    wrap.appendChild(instance.$mount().$el)
  } else {
    const first = wrap.firstElementChild || wrap.firstChild
    if (first) {
      wrap.insertBefore(instance.$mount().$el, first)
    } else {
      wrap.appendChild(instance.$mount().$el)
    }
  }
}

export default {
  show
}