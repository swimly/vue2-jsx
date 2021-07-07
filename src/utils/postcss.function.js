const pkg = require('../../package.json')
const {fromString} = require('css-color-converter')
const isVar = pkg.var
module.exports = {
  v: (string) => {
    const arr = string.split('-')
    const name = arr[0]
    const value = arr[1]
    return isVar ? `var(--${name}-${value}, $${name}-${value})` : `$${name}-${value}`;
  },
  darken: (value, frac) => {
    const darken = 1 - parseFloat(frac);
    const rgba = fromString(value).toRgbaArray();
    const r = rgba[0] * darken;
    const g = rgba[1] * darken;
    const b = rgba[2] * darken;
    return fromRgb([r,g,b]).toHexString();
  },
  opacity: (num) => {
    return `opacity: ${num};filter:alpha(opacity=${num*100})`;
  }
}