//default values
var defaultOptions = {};

// Docsify plugin functions
function plugin(hook, vm) {
  hook.beforeEach(function (content) {
    var html = content.replace(/<!-- start -->/g, '<div class="start"></div>').replace(/<!-- end -->/g, '<div class="end"></div>');
    return html;
  });
  hook.afterEach(function (html, next) {
    next(html);
    $('.start').each(function () {
      var group = $(this).nextUntil('.end');
      var card = $(group).wrapAll('<div class="card"></div>');
    });
    $('.card').each(function () {
      if ($(this).find('pre').length > 0 && $(this).find('pre').attr('data-lang') == 'html') {
        $(this).append(
          $(`
          <div class="card-bar">
            <button class="see">查看代码</button>
          </div>
        `),
        );
        $(this).find('pre').hide()
        $(this).find('.see').click(function(){
          if ($(this).text() == '查看代码') {
            $(this).text('隐藏代码')
          } else {
            $(this).text('查看代码')
          }
          $(this).parents('.card').find('pre').toggle()
        })
        $(this).find('.edit').click(function(){
          createMonaco('monaco', '在线编辑', $(this).parents('.card').find('.code').html().trim())
        })
      }
    });
  });
}

// Docsify plugin options
window.$docsify['card'] = Object.assign(defaultOptions, window.$docsify['card']);
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
