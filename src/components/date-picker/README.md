# DatePicker

<!-- start -->

### 基础

<div class="code">
  <p>{{range}}</p>
  <m-switch :checked.sync="range"></m-switch>
  <p></p>
  <m-row :gutter="12">
    <m-col :span="8">
      <m-date-picker :range="range" placeholder="请选择日期" type="date"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" placeholder="请选择日期时间" type="datetime"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" placeholder="请选择年份" type="year"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" placeholder="请选择月份" type="month"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" placeholder="请选择星期" type="week"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" placeholder="请选择时间" type="time"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" placeholder="请选择季度" type="quart"></m-date-picker>
    </m-col>
  </m-row>
</div>

<!-- end -->

<!-- start -->

### 基础

<div class="code">
  <m-row :gutter="12">
    <m-col :span="8">
      <m-date-picker :range="range" v-model="date1" placeholder="请选择日期" type="date"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" v-model="date2" placeholder="请选择日期时间" type="datetime"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" v-model="date3" placeholder="请选择年份" type="year"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" v-model="date4" placeholder="请选择月份" type="month"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" v-model="date5" placeholder="请选择星期" type="week"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" v-model="date6" placeholder="请选择时间" type="time"></m-date-picker>
    </m-col>
    <m-col :span="8">
      <m-date-picker :range="range" v-model="date7" placeholder="请选择季度" type="quart"></m-date-picker>
    </m-col>
  </m-row>
</div>

<!-- end -->


<!-- start -->

### 默认值

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
          date1: '2021/6/5',
          date2: '2021/7/5 12:00:00',
          date3: '2020',
          date4: '2020/4',
          date5: '2020/23',
          date6: '08:59:00',
          date7: '2020/1',
          range: false
        }
      }
    })
  }
</script>