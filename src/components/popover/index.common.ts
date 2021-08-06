import Main from '../../utils/Main'
import tpl from './src/popover.pug'
import style from './src/popover.css.json'
import $ from '../../utils/index'
interface Option {
  el?: String | HTMLElement,
  content?: string,
  placement: string,
  padding?: number,
  offset: number,
  trigger?: string
}
class Component extends Main {
  public el: HTMLElement
  public parent?: HTMLElement
  public dom?: HTMLElement
  public center?: any
  public timer: any = null
  public lock: boolean = false
  public opt: Option = {
    el: '',
    placement: 'bottom-left',
    padding: 12,
    offset: 16,
    trigger: 'click'
  }
  constructor(option: Option) {
    super()
    this.opt = Object.assign(this.opt, option)
    this.el = typeof this.opt.el === 'string' ? document.querySelector(this.opt.el) as HTMLElement : this.opt.el as HTMLElement
    this.bindEvent()
  }
  public bindEvent() {
    const { el } = this
    const { trigger } = this.opt
    let event: string = trigger || 'click'
    if (trigger === 'hover') {
      event = 'mouseover'
      el.addEventListener('mouseleave', () => {
        this.timer = setTimeout(() => {
          this.hide()
        }, 300)
      })
    }
    el.addEventListener(event, (e) => {
      if (this.lock) return
      e.stopPropagation()
      this.hide()
      clearTimeout(this.timer)
      this.getParent(this.el)
      this.center = $.offset(this.el)
      this.render()
      this.show()
    })
    document.addEventListener('click', () => {
      this.hide()
    })
  }
  public render() {
    const { opt, parent } = this
    const { padding } = this.opt
    const html = tpl({
      style,
      opt
    })
    this.dom = this.parseHtmlToDom(html)
    this.dom.style.padding = `${padding}px`
    parent?.appendChild(this.dom)
  }
  public initPosition() {
    const { dom, center } = this
    const { placement, offset } = this.opt
    if (!dom) return
    const arr = placement.split('-')
    const direction = arr[0]
    const align = arr[1]
    console.log(center, offset)
    let top, left
    switch (direction) {
      case 'bottom' :
        top = center.top + center.height + offset
        break
      case 'top' :
        top = center.top - offset - dom.offsetHeight
        break
      case 'left' :
        left = center.left - offset - dom.offsetWidth
        break
      case 'right' :
        left = center.left + center.width + offset
        break
    }
    dom.style.top = `${top}px`
    dom.style.left = `${left}px`
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
      this.parent = parent.appendChild(wrap)
    }
  }
  public show() {
    const { dom } = this
    if (!dom) return
    dom.style.display = 'inline-block'
    this.initPosition()
    setTimeout(() => {
      this.lock = true
      dom.setAttribute('visible', '')
      dom.addEventListener('click', (e) => {
        e.stopPropagation()
        if (this.opt.trigger === 'focus') {
          this.hide()
        }
        return false
      })
      if (this.opt.trigger === 'hover') {
        dom.addEventListener('mouseover', () => {
          clearTimeout(this.timer)
        })
        dom.addEventListener('mouseleave', () => {
          this.hide()
        })
      }
    }, 10)
  }
  public hide() {
    const { dom, parent } = this
    if (!dom || !parent) return
    dom.removeAttribute('visible')
    setTimeout(() => {
      parent.parentNode?.removeChild(parent)
      this.lock = false
    }, 300)
  }
}
export default class {
  constructor(option: Option) {
    return new Component(option)
  }
}