<style>
  .m-button{
    margin-right:16px;
  }
</style>
# Button 按钮

<!-- start -->

### 介绍

按钮用于触发一个操作，如提交表单。

<!-- end -->

<!-- start -->

### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

<!-- end -->

<!-- start -->

### 不同弧度

通过`conner`设置小圆角，通过`rounder`设置圆弧

<div class="code">
  <m-button conner>圆角按钮</m-button>
  <m-button rounder>圆弧按钮</m-button>
</div>

``` html
<m-button conner>圆角按钮</m-button>
<m-button rounder>圆弧按钮</m-button>
```

<!-- end -->

<!-- start -->

### 不同颜色

通过自定义属性`type`改变按钮的主题色，可选：`default`，`primary`，`warning`，`success`，`danger`，默认值为：`default`。
<div class="code">
  <m-button type="default">按钮</m-button>
  <m-button type="primary">按钮</m-button>
  <m-button type="warning">按钮</m-button>
  <m-button type="success">按钮</m-button>
  <m-button type="danger">按钮</m-button>
</div>

``` html
<m-button type="default">按钮</m-button>
<m-button type="primary">按钮</m-button>
<m-button type="warning">按钮</m-button>
<m-button type="success">按钮</m-button>
<m-button type="danger">按钮</m-button>
```

<!-- end -->

<!-- start -->

### 线条形式

通过属性`outline`设置按钮为线条模式。

<div class="code">
  <m-button type="default" outline>按钮</m-button>
  <m-button type="primary" outline>按钮</m-button>
  <m-button type="warning" outline>按钮</m-button>
  <m-button type="success" outline>按钮</m-button>
  <m-button type="danger" outline>按钮</m-button>
</div>

``` html
<m-button type="default" outline>按钮</m-button>
<m-button type="primary" outline>按钮</m-button>
<m-button type="warning" outline>按钮</m-button>
<m-button type="success" outline>按钮</m-button>
<m-button type="danger" outline>按钮</m-button>
```

<!-- end -->

<!-- start -->

### 朴素按钮

通过属性`plain`设置。

<div class="code">
  <m-button type="default" plain>按钮</m-button>
  <m-button type="primary" plain>按钮</m-button>
  <m-button type="warning" plain>按钮</m-button>
  <m-button type="success" plain>按钮</m-button>
  <m-button type="danger" plain>按钮</m-button>
</div>

``` html
<m-button type="default" plain>按钮</m-button>
<m-button type="primary" plain>按钮</m-button>
<m-button type="warning" plain>按钮</m-button>
<m-button type="success" plain>按钮</m-button>
<m-button type="danger" plain>按钮</m-button>
```
<!-- end -->

<!-- start -->

### 文字按钮

通过属性`text`设置。

<div class="code">
  <m-button type="default" text>按钮</m-button>
  <m-button type="primary" text>按钮</m-button>
  <m-button type="warning" text>按钮</m-button>
  <m-button type="success" text>按钮</m-button>
  <m-button type="danger" text>按钮</m-button>
</div>

``` html
<m-button type="default" text>按钮</m-button>
<m-button type="primary" text>按钮</m-button>
<m-button type="warning" text>按钮</m-button>
<m-button type="success" text>按钮</m-button>
<m-button type="danger" text>按钮</m-button>
```
<!-- end -->

<!-- start -->

### 带图标的按钮

可通过属性`icon`设置按钮前面的图标。

<div class="code">
  <m-button type="default" icon="date">按钮</m-button>
  <m-button type="primary" plain icon="date">按钮</m-button>
  <m-button type="primary" outline icon="date">按钮</m-button>
  <m-button type="primary" icon="date">按钮</m-button>
</div>

``` html
<m-button type="default" icon="date">按钮</m-button>
<m-button type="primary" plain icon="date">按钮</m-button>
<m-button type="primary" outline icon="date">按钮</m-button>
<m-button type="primary" icon="date">按钮</m-button>
```

<!-- end -->

<!-- start -->

### 属性

|属性名称|描述<div style="width:160px;"></div>|可选值<div style="width:100px;"></div>|可选值<div style="width:40px;"></div>|
|:----|:---------|:-----|:----|
|type|改变按钮的颜色|`primary`，`warning`，`success`，`danger`|`default`|
|conner|是否是圆角按钮|`true`，`false`|`true`|
|rounder|是否是圆弧按钮|`true`，`false`|`false`|
|outline|是否是线条按钮|`true`，`false`|`false`|
|plain|是否是朴素按钮|`true`，`false`|`false`|
|text|是否是文字按钮|`true`，`false`|`false`|
|label|按钮的文字|任意文本|-|
|icon|按钮的图标|详情请参考[`icon`](src/components/icon/README)|-|

<!-- end -->

<!-- start -->

### 事件

|事件名称|描述<div style="width:160px;"></div>|回调<div style="width:100px;"></div>|
|:----|:---------|:-----|
|vclick|按钮的点击事件|`Event`|

<!-- end -->

<script>
  var previews = document.querySelectorAll('.code')
  for (var i = 0; i < previews.length; i++) {
    new Vue({
      el: previews[i]
    })
  }
</script>