# Dialog

<!-- start -->

### 基础

<div class="code">
  <m-button @click="tip1">提示框</m-button>
</div>

<!-- end -->

<!-- start -->

### 自定义出现动画

<div class="code">
  <m-button @click="tip('fadeIn')">fadeIn</m-button>
  <m-button @click="tip('zoomIn')">zoomIn</m-button>
  <m-button @click="tip('fadeInDown')">fadeInDown</m-button>
  <m-button @click="tip('fadeInUp')">fadeInUp</m-button>
  <m-button @click="tip('zoomInDown')">zoomInDown</m-button>
  <m-button @click="tip('zoomInUp')">zoomInUp</m-button>
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
        tip1: function () {
          this.$dialog.show({
            title: '提示',
            content: '需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。'
          })
        },
        tip: function (effect) {
          this.$dialog.show({
            title: '提示',
            effect,
            content: '需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。'
          })
        }
      }
    })
  }
</script>