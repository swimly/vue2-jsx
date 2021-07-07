<style>
  .m-row{
    margin: 20px 0 !important;
  }
</style>
# Popover

<!-- start -->

### 基础

<div class="code">
  <m-row>
    <m-col :span="4">
    </m-col>
    <m-col :span="4">
      <m-popover placement="bottom-left">
        <m-button>左下</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="bottom">
        <m-button>下面</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="bottom-right">
        <m-button>右下</m-button>
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
        <m-button>右上</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4">
      <m-popover placement="left-top">
        <m-button>左上</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
    </m-col>
  </m-row>
  <m-row>
    <m-col :span="4">
      <m-popover placement="right">
        <m-button>右边</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4">
      <m-popover placement="left">
        <m-button>左边</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
    </m-col>
  </m-row>
  <m-row>
    <m-col :span="4">
      <m-popover placement="right-bottom">
        <m-button>右下</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4"></m-col>
    <m-col :span="4">
      <m-popover placement="left-bottom">
        <m-button>左下</m-button>
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
        <m-button>上右</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="top">
        <m-button>上面</m-button>
        <div style="width: 400px;" slot="content">当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。</div>
      </m-popover>
    </m-col>
    <m-col :span="4">
      <m-popover placement="top-right">
        <m-button>上左</m-button>
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

### 基础

<div class="code">
  <m-button @click="click">友情提示</m-button>
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
        click: function () {
          this.$popover.show('00000000000')
        }
      }
    })
  }
</script>