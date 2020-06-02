const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    publicPath: './',
    outputDir: 'push', // 打包生成的文件夹
    lintOnSave: false,
    runtimeCompiler: true,
    chainWebpack: config => {
        /**清除已有的loader规则，如果你不这样做，接下来的loader会附加在该规则现有的loader之后 */
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()

        // svg 图片配置
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/assets/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/styles/mixin.less')]
        }
    },
    devServer: {

        // open: true, // dev server将直接打开浏览器
        proxy: {
            // // 配置重定向 
            '/push': {
                //要访问的跨域的api的域名
                target: 'http://192.168.2.39:8780', // push 系统的测试环境地址 //192.168.2.31:8780
                changeOrigin: true,
                pathRewrite: {
                    '/push': ''
                }
            },
            '/api': {
                //要访问的跨域的api的域名
                target: 'http://192.168.2.39:8680',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/apiod': {
                //要访问的跨域的api的域名
                target: 'http://192.168.1.72:8089',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '^/qrcode': {
                target: 'http://192.168.1.72:8877',
                changeOrigin: true,
                pathRewrite: {
                    '^/qrcode': ''
                }
            }
        }
    }

}