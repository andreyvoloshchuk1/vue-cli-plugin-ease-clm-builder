const path = require('path');
const webpack = require('webpack');

module.exports = (api, sl) => {
    const config = api.resolveChainableWebpackConfig();

    config.plugin('copy')
        .tap(args => {
            args[0][0].to = process.env.VUE_APP_OUT_DIR_PATH;
            return args
        });

    config.optimization.splitChunks({
        cacheGroups: {
            vendors: {
                name: `chunk-vendors`,
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                chunks: 'initial',
                reuseExistingChunk: true
            },
            common: {
                name: `chunk-common`,
                priority: -20,
                chunks: 'all',
                reuseExistingChunk: true,
            },
        },
    });

    config
        .output
        .path(process.env.VUE_APP_OUT_DIR_PATH)
        .filename(`js/[name].[chunkhash:8].js`)
        .chunkFilename(`js/[name].[chunkhash:8].js`);

    config
        .plugin('extract-css')
        .tap(args => {
            args[0].filename = `css/[name].[contenthash:8].css`;
            args[0].chunkFilename = `css/[name].[contenthash:8].css`;
            return args
        });


    config
        .plugin('html')
        .tap(args => {
            args[0].template = api.resolve('public/index.html');
            args[0].filename = path.join(process.env.VUE_APP_OUT_DIR_PATH, 'index.html');
            return args
        });

    config.module
        .rule('fonts')
        .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
        .use('url-loader')
        .loader('url-loader')
        .options({
            limit: 4096,
            name: `fonts/[name].[hash:8].[ext]`,
            publicPath: './',
        });

    config.module.rules.delete('images');
    const filesReg = new RegExp(`\\.(png|jpe?g|gif|webp)(\\?.*)?$`);
    const contextReg = new RegExp(`${sl.id}`);
    const contextRegNot = new RegExp(`^${sl.id}`);


    config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {

    });

    config.plugin('ignore')
        .use(webpack.IgnorePlugin, [
            {
                checkContext(resource){},
                checkResource(resource){
                    if ((!contextReg.test(resource) && /slide/.test(resource) && /assets/.test(resource)) || (!contextReg.test(resource) && /slide/.test(resource) && /.vue/.test(resource)) || (/router/.test(resource))){
                        return true
                    }
                    else {
                        return false
                    }
                }
            }
        ]);

    config.module
        .rule('images')
        .test(/\.(png|jpg|gif|webp)(\?.*)?$/)
        .include
        .add((context) => {
            return contextReg.test(context)
        })
        .end()
        .use('url-loader')
        .loader('url-loader')
        .options({
            limit: 4096,
            name: `assets/[name].[ext]`,
        });


    // config.plugin('copy')
    //     .tap(args => {
    //         args[0][0].from = process.env.VUE_APP_CLM_GLOBAL;
    //         args[0][0].to = path.join(`${process.env.VUE_APP_OUT_DIR_PATH}`, 'assets');
    //         return args
    //     });

    config.module
        .rule('media')
        .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
            limit: 4096,
            context: `src/${sl.id}/assets`,
            name: `assets/[name].[ext]`,
        });

    config.plugins.delete('prefetch');
    config.performance.hints(false);

    return config;
};