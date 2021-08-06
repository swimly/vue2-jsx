export default class {
  constructor () {}
  public parseHtmlToDom (str:string): HTMLElement {
    const dom = document.createElement('div')
    dom.innerHTML = str
    return dom.childNodes[0] as HTMLElement
  }
}