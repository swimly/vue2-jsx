# Message 全局提示

<!-- start -->

### 介绍

全局展示操作反馈信息。

> 可提供成功、警告和错误等反馈信息。

> 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

<!-- end -->

<!-- start -->

### 普通提示

信息提醒反馈。

<div class="code">
  <m-button @click="notice">提示</m-button>
</div>

``` html
<m-button @click="notice">提示</m-button>
<script>
  new Vue({
    el: '#app',
    methods: {
      notice: function () {
        this.$message.show('这是全局提示')
      }
    }
  })
</script>

```

<!-- end -->

<!-- start -->

### 其他提示类型

包括成功、失败、警告。

<div class="code">
  <m-button @click="notice1">成功</m-button>
  <m-button @click="notice2">提示</m-button>
  <m-button @click="notice3">错误</m-button>
</div>

``` html
<m-button @click="notice1">成功</m-button>
<m-button @click="notice2">提示</m-button>
<m-button @click="notice3">错误</m-button>
<script>
  new Vue({
    el: '#app',
    methods: {
      notice1: function () {
        this.$message.success('登录成功')
      },
      notice2: function () {
        this.$message.warning('登录成功')
      },
      notice3: function () {
        this.$message.error('登录成功')
      }
    }
  })
</script>

```

<!-- end -->

<!-- start -->

### 修改延时

自定义时长 `10s`，默认时长为 `3s`。

<div class="code">
  <m-button @click="notice4">10s延时</m-button>
</div>

``` html
<m-button @click="notice4">提示</m-button>
<script>
  new Vue({
    el: '#app',
    methods: {
      notice4: function () {
        this.$message.show({
          message: 'This is a prompt message for success, and it will disappear in 10 seconds',
          duration: 100000
        })
      }
    }
  })
</script>

```

<!-- end -->

<!-- start -->

### 加载中

进行全局 loading，异步自行移除。

<div class="code">
  <m-button @click="notice5">显示加载</m-button>
</div>

``` html
<m-button @click="notice5">显示加载</m-button>
<script>
  new Vue({
    el: '#app',
    methods: {
      notice5: function () {
        var loading = this.$message.loading('加载中，请稍后')
        console.log(loading)
      }
    }
  })
</script>

```

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
        notice: function () {
          this.$message.show('这是全局提示')
        },
        notice1: function () {
          this.$message.success('登录成功')
        },
        notice2: function () {
          this.$message.warning('登录成功')
        },
        notice3: function () {
          this.$message.error('登录成功')
        },
        notice4: function () {
          this.$message.show({
            message: 'This is a prompt message for success, and it will disappear in 10 seconds',
            duration: 10000
          })
        },
        notice5: function () {
          var loading = this.$message.loading('加载中，请稍后')
          setTimeout(function(){
            loading.hide()
          }, 2000)
        }
      }
    })
  }
</script>