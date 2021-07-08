# Popconfirm

<!-- start -->

### 基础

<div class="code">
  <m-popconfirm @click="onClick">
    <m-button>删除</m-button>
  </m-popconfirm>
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
      methods: {
        onClick: function (res, e) {
          console.log(res, e)
          e.hide()
        }
      }
    })
  }
</script>