# Icon 图标

<!-- start -->

语义化的矢量图形。使用图标组件

<!-- end -->

<!-- start -->

### 基本用法

<div class="code">
  <m-icon name="success"></m-icon>
</div>

``` html
<m-icon name="success"></m-icon>
```

<!-- end -->

<!-- start -->

### 改变大小

通过`size`改变图标大小。

<div class="code">
  <m-icon name="success" size="32"></m-icon>
</div>

``` html
<m-icon name="success" size="32"></m-icon>
```

<!-- end -->

<!-- start -->

### 改变颜色

通过`color`改变图标颜色。

<div class="code">
  <m-icon name="success" color="#f00"></m-icon>
</div>

``` html
<m-icon name="success" color="#f00"></m-icon>
```

<!-- end -->

<!-- start -->

### 图标旋转

<div class="code">
  <m-icon name="loading" spin></m-icon>
</div>

``` html
<m-icon name="loading" spin></m-icon>
```

<!-- end -->

<!-- start -->

### 图标列表

<div class="code">
  <m-icon name="success" size="32"></m-icon>
</div>

<!-- end -->

<!-- start -->

### 属性

|属性名称|描述<div style="width:160px;"></div>|可选值<div style="width:100px;"></div>|可选值<div style="width:40px;"></div>|
|:----|:---------|:-----|:----|
|Header|Title|Title|Title|

<!-- end -->

<script>
  var previews = document.querySelectorAll('.code')
  for (var i = 0; i < previews.length; i++) {
    new Vue({
      el: previews[i]
    })
  }
</script>