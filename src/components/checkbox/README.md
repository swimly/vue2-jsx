# Checkbox

<!-- start -->

### 基础

<div class="code">
  <p>{{check}}</p>
  <m-checkbox-group>
    <m-checkbox :checked.sync="check">emui</m-checkbox>
  </m-checkbox-group>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <p>{{group}}</p>
  <m-checkbox-group v-model="group">
    <m-checkbox value="miui">miui</m-checkbox>
    <m-checkbox value="flyme">flyme</m-checkbox>
    <m-checkbox value="coloros">coloros</m-checkbox>
    <m-checkbox value="emui">emui</m-checkbox>
  </m-checkbox-group>
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
          group: ['miui', 'emui']
        }
      }
    })
  }
</script>