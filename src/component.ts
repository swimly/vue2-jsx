import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import MButton from './components/button/src/index.vue'


const Button = wrap(Vue, MButton)

export default class {
  constructor () {
    window.customElements.define(Button.name, Button)
  }
}