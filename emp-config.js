const withVue3 = require('@efox/emp-vue3')
const path = require('path')
const ProjectRootPath = path.resolve('./')
const { getConfig } = require(path.join(ProjectRootPath, './src/config'))
module.exports = withVue3(({ config, env, empEnv }) => {
  const confEnv = env === 'production' ? 'prod' : 'dev'
  const conf = getConfig(empEnv || confEnv)
  const port = conf.port
  const publicPath = conf.publicPath
  // 设置项目URL
  config.output.publicPath(publicPath)
  config.externals({
    'vue': 'Vue',
    'element-plus':'ElementPlus'
  })
  // 设置项目端口
  config.devServer.port(port)
  
  config.plugin('mf').tap(args => {
    console.info(args)
    args[0] = {
      ...args[0],
        name: "wComponent",
        // 被远程引入的文件名
        filename: 'table.js',
        exposes:{
          './table':'./src/components/Layout.vue',
          './button':'./src/components/Button.vue'
        }
    }
    return args
  })
  // 配置 index.html
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        // head 的 title
        title: 'jsp-provider',
        // 远程调用项目的文件链接
        files: {
          js: ['https://unpkg.com/vue@3.0.7/dist/vue.global.js','https://unpkg.com/element-plus@1.0.2-beta.35/lib/index.full.js'],
          css: ['https://unpkg.com/element-plus/lib/theme-chalk/index.css']
        },
      },
    }
    return args
  })
})
