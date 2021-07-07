module.exports = plop => {
  // 创建生成器
  plop.setGenerator('component', {
    // 生成器描述
    description: '创建一个新组件！',
    // 询问
    prompts: [
      // 组件名称
      {
        type: 'input',
        name: 'name',
        message: '请填写组件名称！',
        default: 'name'
      }
    ],
    // 把基于模板创建的文件，放到指定的目录
    actions: (data) => {
      const name = data.name
      const actions = [
        {
          type: 'add',
          path: `../src/components/${name}/src/${name}.css`,
          templateFile: `../src/temp/css.hbs`
        },
        {
          type: 'add',
          path: `../src/components/${name}/index.ts`,
          templateFile: '../src/temp/js.hbs'
        },
        {
          type: 'add',
          path: `../src/components/${name}/README.md`,
          templateFile: `../src/temp/readme.hbs`
        },
        {
          type: 'add',
          path: `../src/components/${name}/src/${name}.jsx`,
          templateFile: `../src/temp/jsx.hbs`
        },
        {
          type: 'add',
          path: `../src/components/${name}/index.html`,
          templateFile: `../src/temp/html.hbs`
        },
        {
          type: 'add',
          path: `../src/components/${name}/src/${name}.css.json`,
          templateFile: `../src/temp/json.hbs`
        }
      ]
      return actions
    }
  })
}