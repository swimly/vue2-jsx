function servePreview(code, dom) {
  var codes = code;
  var style = `
    <style>
      html,body{
        height:auto;
        margin:0;
      }
      ::-webkit-scrollbar {
        width: 6px;
        height: 1px;

      }
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #ccc;
      }
      ::-webkit-scrollbar-track {
        background: #fff;
      }
    </style>
  `;
  var theme = window.localStorage.getItem('theme') || 'default'
  var path = window.location.origin + window.location.pathname
  var blob = new Blob([`<link rel="stylesheet" href="${path}/dist/common.css"/>`,`<link rel="stylesheet" href="${path}/dist/themes/${theme}/index.css"/>`, style, codes, `<script src="${path}/dist/common.js"></script>`], {
    type: 'text/html',
    endings: 'transparent',
  });
  var url = URL.createObjectURL(blob);
  dom.attr('src', url);
}


function createMonaco (id, title, html) {
  var code = html.replace(/..\/..\/../g, `${window.location.origin + window.location.pathname}`)
  $(`
    <div class="playground">
      <div class="playground-head">
        <h2 class="playground-title">${title}</h2>
        <button id="close">关闭</button>
        <button id="copy">复制</button>
        <button id="format">格式化</button>
        <button id="html">导出HTML</button>
        <button id="preview">预览</button>
      </div>
      <div class="playground-content">
        <div class="playground-view">
          <div class="playground-editor" id="${id}"></div>
        </div>
        <div class="playground-aside">
          <div class="playground-phone">
            <iframe id="playground"></iframe>
          </div>
        </div>
      </div>
    </div>
  `).appendTo('body')
  var editor = monaco.editor.create(document.querySelector(`#${id}`), {
    value: code,
    language: 'text/html'
  })
  monaco.editor.defineTheme('myTheme', {
    base: 'vs',
    inherit: true,
    rules: [{ background: 'EDF9FA' }],
  });
  monaco.editor.setTheme('myTheme');
  setTimeout(function(){
    editor.getAction(['editor.action.formatDocument'])._run();
  }, 600)
  servePreview(code, $('#playground'))
  $('.playground').on('keydown', function (e) {
    var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && keyCode == 83) {
      e.preventDefault();
      servePreview(editor.getValue(), $('#playground'));
      editor.getAction(['editor.action.formatDocument'])._run();
    }
  });
  $('#copy').click(function(){
    copyTocontent(editor.getValue())
  })
  $('#format').click(function(){
    editor.getAction(['editor.action.formatDocument'])._run();
  })
  $('#preview').click(function(){
    servePreview(editor.getValue(), $('#playground'));
  })
  $('#close').click(function(){
    $('.playground').remove()
    $('.monaco-aria-container').remove()
  })
  $('#html').click(function(){
    // 下载文件方法
			var funDownload = function(content, filename) {
				var eleLink = document.createElement('a');
				eleLink.download = filename;
				eleLink.style.display = 'none';
				// 字符内容转变成blob地址
				var blob = new Blob([content]);
				eleLink.href = URL.createObjectURL(blob);
				// 触发点击
				document.body.appendChild(eleLink);
				eleLink.click();
				// 然后移除
				document.body.removeChild(eleLink);
			};
 
			if('download' in document.createElement('a')) {
				// 作为test.html文件下载
				funDownload(editor.getValue(), 'Demo.html');
			} else {
				alert('浏览器不支持')
			}

  })
}

const copyTocontent = function (str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
  common.toast.show({
    message: `复制成功！`,
    position: 'top',
    overlay: false
  })
};

function IsLoad(url,fun){
  $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
          if($.isFunction(fun)){
              fun(true);
          }
      },
      error:function () {
          if($.isFunction(fun)){
              fun(false);
          }
      }
  });
}