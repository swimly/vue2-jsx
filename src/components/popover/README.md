<style>
  .mc-row{
    margin: 20px 0 !important;
  }
</style>
# Popover 气泡悬浮框

<!-- start -->

点击/鼠标移入元素，弹出气泡式的卡片浮层。

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

<!-- end -->

<!-- start -->

### 基本

最简单的用法，浮层的大小由内容区域决定。

<div class="code">
  <m-popover>
    <m-button>鼠标移上来</m-button>
    <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
  </m-popover>
</div>

<!-- end -->

<!-- start -->

### 三种触发方式

鼠标移入、聚集、点击。

<div class="code">
  <m-popover trigger="hover">
    <m-button>鼠标移上来</m-button>
    <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
  </m-popover>
  <m-popover trigger="focus">
    <m-button>获取焦点</m-button>
    <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
  </m-popover>
  <m-popover trigger="click">
    <m-button>点击</m-button>
    <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
  </m-popover>
</div>

<!-- end -->

<!-- start -->

### 位置

位置有十二个方向。

<div class="code">
  <m-row>
    <m-col :span="4">
    </m-col>
    <m-col :span="4">
      <m-popover placement="bottom-left">
        <m-button>bottom-left</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="bottom">
        <m-button>bottom</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="bottom-right">
        <m-button>bottom-right</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
    </m-col>
    <m-col :span="4">
    </m-col>
  </m-row>
  <m-row>
    <m-col :span="4">
      <m-popover placement="right-top">
        <m-button>right-top</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4">
      <m-popover placement="left-top">
        <m-button>left-top</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
    </m-col>
  </m-row>
  <m-row>
    <m-col :span="4">
      <m-popover placement="right">
        <m-button>right</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4">
      <m-popover placement="left">
        <m-button>left</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
    </m-col>
  </m-row>
  <m-row>
    <m-col :span="4">
      <m-popover placement="right-bottom">
        <m-button>right-bottom</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4">
      <m-popover placement="left-bottom">
        <m-button>left-bottom</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
    </m-col>
  </m-row>
  <m-row>
    <m-col :span="4">
    </m-col>
    <m-col :span="4">
      <m-popover placement="top-left">
        <m-button>top-left</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="top">
        <m-button>top</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="top-right">
        <m-button>top-right</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
    </m-col>
    <m-col :span="4">
    </m-col>
  </m-row>
</div>

<!-- end -->

<!-- start -->

### 属性

|属性名称|描述<div style="width:160px;"></div>|可选值<div style="width:100px;"></div>|默认值<div style="width:40px;"></div>|
|:----|:---------|:-----|:----|
|title|卡片标题|`string`|-|
|content|卡片内容|`string`|-|
|trigger|触发事件|`click`，`hover`，`focus`|hover|
|placement|悬浮框相对于点击元素的方位|参考上面12个方向|bottom-left|
|offset|偏移量|`number`|12|

<!-- end -->

<!-- start -->

### 插槽

|slot名称|描述<div style="width:160px;"></div>|
|:----|:---------|
|title|卡片标题|
|content|卡片内容|
|default|包裹元素|

<!-- end -->

<script>
  var previews = document.querySelectorAll('.code')
  for (var i = 0; i < previews.length; i++) {
    new Vue({
      el: previews[i],
      methods: {
        click: function () {
          this.$popover.show('00000000000')
        }
      }
    })
  }
</script>