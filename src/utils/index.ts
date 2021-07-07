export default {
  getScrollBarWidth (): number {
    let noScroll, scroll, oDiv = document.createElement("DIV");
    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = "scroll";
    scroll = oDiv.clientWidth;
    document.body.removeChild(oDiv);
    return noScroll - scroll;
  },
  offset (curEle: HTMLElement) {
    let totalLeft = null, totalTop = null, par = curEle.offsetParent as HTMLElement;
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop
    while (par) {
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        //累加父级参照物的边框
        totalLeft += par.clientLeft;
        totalTop += par.clientTop
      }
      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop;
      par = par.offsetParent as HTMLElement;
    }
    return {
      left: totalLeft,
      top: totalTop
    }
  }
}