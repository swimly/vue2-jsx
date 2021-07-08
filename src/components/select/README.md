# Select

<!-- start -->

### 基础

<div class="code">
  <div style="width: 300px;">
    <m-select v-model="select">
      <m-select-option value="向日葵">向日葵</m-select-option>
      <m-select-option value="西瓜">西瓜</m-select-option>
      <m-select-option value="百合">百合</m-select-option>
      <m-select-option value="栀子花">栀子花</m-select-option>
    </m-select>
  </div>
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
      el: previews[i],
      data: function () {
        return {
          select: '西瓜'
        }
      }
    })
  }
</script>