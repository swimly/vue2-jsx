# Tooltip 文字提示

<!-- start -->

### 基础

<div class="code">
  <m-tooltip content="简单的文字提示气泡框">
    <m-button>提示框</m-button>
  </m-tooltip>
</div>

<!-- end -->

<!-- start -->

### 内置颜色

内置5种颜色。

<div class="code">
  <m-tooltip type="primary" content="简单的文字提示气泡框">
    <m-button>提示框</m-button>
  </m-tooltip>
  <m-tooltip type="warning" content="简单的文字提示气泡框">
    <m-button>提示框</m-button>
  </m-tooltip>
  <m-tooltip type="success" content="简单的文字提示气泡框">
    <m-button>提示框</m-button>
  </m-tooltip>
  <m-tooltip type="danger" content="简单的文字提示气泡框">
    <m-button>提示框</m-button>
  </m-tooltip>
</div>

<!-- end -->

<!-- start -->

### 自定义颜色

通过`backgroundColor`，`labelColor`随意设置。

<div class="code">
  <m-tooltip background-color="#666" label-color="#fff" content="简单的文字提示气泡框">
    <m-button>提示框</m-button>
  </m-tooltip>
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