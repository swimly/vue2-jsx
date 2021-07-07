function setColor() {
  if ($('.color-panel').length) {
    var tname = window.localStorage.getItem('theme');
    var theme = `${window.location.origin + window.location.pathname}dist/themes/${tname}/index.css`;
    $('#download').attr('href', theme);
    $('#download').attr('download', `${tname}.css`);
    $('.color-panel').each(function () {
      var color = $(this).css('background-color');
      $(this).find('.color').html(color);
      $(this).click(function () {
        copyTocontent(color);
      });
    });
  }
}
var loadStyle = function (theme) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `./dist/themes/${theme}/index.css`;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
  var base = window.location.origin + window.location.pathname;
  $('iframe')
    .contents()
    .find('head')
    .append($(`<link href="${base}dist/themes/${theme}/index.css" rel="stylesheet" type="text/css" />`));
  setColor()
};

!(function () {
  function e(e) {
    var qrdom;
    if ($('#ct').length > 0) {
      qrdom = $('#ct');
      return false;
    } else {
      qrdom = $(`<dl class="select" id="ct">
      <dt title="换肤"><svg t="1616667725249" viewBox="0 0 1215 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2038" width="16" height="16"><path d="M919.741126 0.0032v78.719754l200.447373 198.911378-111.99965 112.25565a77.439758 77.439758 0 0 0-53.055834-19.647939c-45.183859 0-80.639748 35.391889-80.639748 80.703748v415.486701c0 43.327865-35.32789 78.783754-78.527754 78.783754H402.878741a78.911753 78.911753 0 0 1-78.591754-78.719754V450.881791c0-45.311858-35.391889-80.703748-80.639748-80.703748-19.583939 0-39.231877 7.871975-52.991835 19.647939l-111.99965-112.255649 198.39938-198.847379h49.151847l1.983993 1.919994c55.039828 82.751741 159.231502 135.935575 271.231153 135.935575 111.99965 0 216.191324-51.19984 271.231152-135.871575 0-1.983994 1.919994-1.983994 1.919994-1.983994h47.167853V0.0032zM328.190974 0.0032h-43.199865c-27.519914 0-47.167853 7.871975-60.927809 23.679926L23.551926 222.466505c-31.359902 31.487902-31.359902 80.703748 0 110.271655L139.519564 448.961797c13.759957 13.823957 33.407896 21.695932 51.13584 21.695932 17.663945 0 37.311883-7.871975 51.071841-21.695932h1.919994c1.983994 0 1.983994 0 1.983993 1.983994v415.486701A157.823507 157.823507 0 0 0 402.878741 1024h393.086772a157.823507 157.823507 0 0 0 157.183508-157.567508V450.945791c0-1.919994 0-1.919994 1.983994-1.919994h1.919994c13.823957 13.759957 33.471895 21.631932 51.19984 21.631932 19.583939 0 37.311883-7.871975 51.007841-21.695932L1175.228327 332.80216c31.487902-31.487902 31.487902-80.767748 0-110.271655L976.764948 23.619126a78.655754 78.655754 0 0 0-56.959822-23.615926h-49.151847c-27.519914 0-51.13584 13.759957-66.879791 37.439883-41.215871 60.991809-117.887632 100.415686-206.335355 100.415686-88.447724 0-165.119484-41.343871-206.335355-100.479686C379.326815 13.827157 353.726895 0.0032 328.190974 0.0032z" p-id="2039" fill="#333"></path></svg></dt>
      <dd style="min-width:140px;min-height:0;" id="theme">
        <p active name="default">默认</p>
        <p active name="red">红色</p>
        <p active name="wechat">政务微信</p>
        <p name="dark">暗黑</p>
      </dd>
      </dl>`).appendTo('#tool');
    }
    var theme = window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'default';
    window.localStorage.setItem('theme', theme)
    loadStyle(theme)
    $('body').click(function(){
      qrdom.removeClass('active')
    })
    qrdom.click(function(e){
      e.stopPropagation()
      $(this).toggleClass('active')
      theme = window.localStorage.getItem('theme');
      $(this).find('p').each(function(){
        if ($(this).attr('name') == theme) {
          $(this).attr('active', '')
        } else {
          $(this).removeAttr('active')
        }
        $(this).click(function(){
          var name = $(this).attr('name')
          loadStyle(name)
          window.localStorage.setItem('theme', name)
          $('iframe').each(function(){
            var arr = $(this).attr('src').split('=')
            var nurl = arr.length > 1 ? `${arr[0]}=${name}` : `${arr[0]}?theme=${name}`
            $(this).attr('src', nurl)
            $('.preview-bar input').val(nurl)
          })
          // common.toast.show({
          //   message: `成功切换到主题【${$(this).attr('name')}】`,
          //   position: 'top',
          //   overlay: false,
          // });
        })
      })
    })
  }
  window.$docsify.plugins = [].concat(function (o) {
    o.doneEach(e);
  }, window.$docsify.plugins);
})();
