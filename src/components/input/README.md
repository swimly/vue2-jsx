<style>
  .mc-input{
    margin: 20px 0;
  }
</style>
# Input

<!-- start -->

### 基础

<div class="code">
  <m-input></m-input>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <m-input prefix-icon="date"></m-input>
  <m-input prefix-label="日期"></m-input>
  <m-input>
    <span slot="prefix">哈哈哈</span>
  </m-input>
  <m-input suffix-icon="date"></m-input>
  <m-input suffix-label="发送验证码" suffix-color="#f00"></m-input>
  <m-input>
    <span slot="suffix">哈哈哈</span>
  </m-input>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <m-input :allow-clear="true"></m-input>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <m-input :max-length="8"></m-input>
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