# Radio

<!-- start -->

### 基础

<div class="code">
  <p>{{check}}</p>
  <m-radio-group>
    <m-radio :checked.sync="check">emui</m-radio>
  </m-radio-group>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <p>{{group}}</p>
  <m-radio-group v-model="group">
    <m-radio value="miui">miui</m-radio>
    <m-radio value="flyme">flyme</m-radio>
    <m-radio value="coloros">coloros</m-radio>
    <m-radio value="emui">emui</m-radio>
  </m-radio-group>
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
          check: true,
          group: 'miui'
        }
      }
    })
  }
</script>