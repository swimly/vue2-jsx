import Vue from 'vue'
import Component from './src/dialog'

let Constructor = Vue.extend(Component)
let instance

const show = (options: any) => {
  instance = new Constructor({
    data: options
  })
  document.body.appendChild(instance.$mount().$el)
}

export default {
  show
}