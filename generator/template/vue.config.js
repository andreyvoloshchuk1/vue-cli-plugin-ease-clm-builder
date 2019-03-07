module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                    $width: ${require('./src/clm.config').clm.device.resolution.width}px;
                    $height: ${require('./src/clm.config').clm.device.resolution.height}px;
                    @import "@/style/variables.scss";
                    @import "@/style/mixins.scss";`,
            },
        },
    },
};