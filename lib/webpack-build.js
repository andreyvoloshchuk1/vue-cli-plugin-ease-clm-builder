const webpack = require('webpack');
const webpackConfig = require("./webpack-build-config");

module.exports = (api, sl) => {
    const config = webpackConfig(api, sl);
    return new Promise((res, rej) => {
        webpack(config.toConfig(), (err, stats) => {
            if (err) return console.log(err);
            if (stats.hasErrors()) return console.log(`Build failed with errors.`);
            console.log("Build complete");
            res();
        });
    });
};