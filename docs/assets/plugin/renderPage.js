!(function () {
  function e(e) {
    var iframes = document.querySelectorAll('iframe')
    iframes.forEach(function (ifr) {
      ifr.onload = function () {
        if (ifr.contentDocument.querySelector('.iframe-tool')) {
          return false;
        }
        var url = ifr.src
        var tool = ifr.contentDocument.createElement('div');
        tool.className = 'iframe-tool'
        tool.style.position = 'fixed'
        tool.style.top = '0px'
        tool.style.right = '0px'
        tool.style.zIndex = '102'
        tool.innerHTML = `
        <div class="v-button" id="edit" type="primary" size="56" margin="t16" conner="1" inline="1">
          <span class="v-button-label">查看代码</span>
        </div>
        <div class="v-button" id="preview" type="primary" margin="l16,r24,t16" size="56" conner="1" inline="1">
          <span class="v-button-label">预览</span>
        </div>`
        ifr.contentDocument.body.appendChild(tool)
        tool.querySelector('#preview').onclick = function () {
          url = url.indexOf('?theme') >= 0 ? url : `${url}?theme=${window.localStorage.getItem('theme')}`
          window.open(url)
        }
        tool.querySelector('#edit').onclick = function () {
          $.get(ifr.src, function (html, status) {
            createMonaco('monaco', '在线编辑', html);
          });
          return false;
        }
      }
    })
  }
  window.$docsify.plugins = [].concat(function (o) {
    o.doneEach(e);
  }, window.$docsify.plugins);
})();
