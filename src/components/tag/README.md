# Tag

<!-- start -->

### 基础

<div class="code">
  <m-tag>title</m-tag>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <m-tag :allow-close="true">标签</m-tag>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <m-tag type="primary">标签</m-tag>
  <m-tag type="warning">标签</m-tag>
  <m-tag type="success">标签</m-tag>
  <m-tag type="danger">标签</m-tag>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
<m-tag outline>标签</m-tag>
  <m-tag type="primary" outline>标签</m-tag>
  <m-tag type="warning" outline>标签</m-tag>
  <m-tag type="success" outline>标签</m-tag>
  <m-tag type="danger" outline>标签</m-tag>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <m-tag :size="28">标签</m-tag>
  <m-tag :size="24">标签</m-tag>
  <m-tag :size="20">标签</m-tag>
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