## 起步

### 引用全局资源

按照平常引用css和js的方式引入`vue`和`mui`的插件。

``` html
<link rel="stylesheet" href="dist/mui.css">

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="dist/mui.js"></script>
```

### 代码使用

``` html
<div id="app">
  
</div>

<script>
  // 全局引入
  Vue.use(MUI)
  new Vue({
    el: '#app'
  })
</script>
```