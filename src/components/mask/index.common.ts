import Main from '../../utils/Main'
import './src/mask.css'
import style from './src/mask.css.json'
import tpl from './src/mask.pug'
interface Option {
  el?: String | HTMLElement
}
class Component extends Main {
  public el?: HTMLElement | null
  public parent?:HTMLElement = document.body
  public dom?: HTMLElement
  public opt: Option = {
  }
  constructor (option: Option) {
    super()
    this.opt = Object.assign(this.opt, option)
    this.el = this.opt.el ? typeof this.opt.el === 'string' ? document.querySelector(this.opt.el) as HTMLElement : this.opt.el as HTMLElement : null
    if (this.el) {
      this.getParent(this.el)
    }
    this.render()
    this.show()
  }
  public render () {
    const {opt} = this
    const html = tpl({
      style,
      opt
    })
    this.dom = this.parent?.appendChild(this.parseHtmlToDom(html))
  }
  public getOverflow(obj: any) {
    if (obj.currentStyle) {
      return obj.currentStyle['overflow']
    } else {
      return getComputedStyle(obj)['overflow']
    }
  }
  public getParent(el: HTMLElement): void {
    const parent = el.parentNode as HTMLElement
    const overflow = this.getOverflow(parent)
    if (overflow !== 'auto' && parent.tagName !== 'BODY') {
      this.getParent(parent)
    } else {
      const wrap = document.createElement('div')
      wrap.style.position = 'absolute'
      wrap.style.top = '0px'
      wrap.style.left = '0px'
      wrap.style.zIndex = '1000'
      wrap.style.width = '100%'
      wrap.style.height = parent.scrollHeight + 'px'
      this.parent = parent.appendChild(wrap)
    }
  }
  public show() {
    const { dom } = this
    if (!dom) return
    dom.style.display = 'inline-block'
    setTimeout(() => {
      dom.setAttribute('visible', '')
    }, 10)
  }
  public hide() {
    const { dom } = this
    if (!dom || !parent) return
    dom.removeAttribute('visible')
    setTimeout(() => {
      dom.parentNode?.removeChild(dom)
    }, 300)
  }
}
export default class {
  constructor (option:Option) {
    return new Component(option)
  }
}