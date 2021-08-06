# Mask

<!-- start -->

### 基础

<div class="code">
  <m-button @click="mask">弹出遮罩</m-button>
  <button class="button">弹出遮罩</button>
</div>

<!-- end -->

<!-- start -->

### 加载中

<div class="code">
  <m-button @click="loading">加载中</m-button>
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
        mask: function () {
          this.$mask.show()
        },
        loading: function () {
          var loading = this.$mask.loading({
            content: '加载中'
          })
          setTimeout(function(){
            loading.hide()
          }, 3000)
        }
      }
    })
  }

  var buttons = document.querySelectorAll('.button')
  for (var i = 0; i < buttons.length; i ++) {
    buttons[i].onclick = function () {
      var mask = mui.Mask()
      setTimeout(function () {
        mask.hide()
      }, 1000)
    }
  }
</script>