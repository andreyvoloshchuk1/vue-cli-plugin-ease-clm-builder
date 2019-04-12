const path = require('path');
const root = process.cwd();
const fs = require('fs');
const fse = require('fs-extra');
const webpackBuild = require('../../../lib/webpack-build');
const screenMaker = require('../../../lib/screen-maker');
const assetsClean = require('../../../lib/assets-clean');
const { structure } = require(path.join(root, 'src', 'clm.config'));


module.exports = async (api) => {
    for (let sl of structure){
        process.env.VUE_APP_OUT_DIR_PATH = path.join(root, 'dist', process.env.VUE_APP_CLM, process.env.VUE_APP_CLM_LANG, sl.id);
        process.env.VUE_APP_SL_PATH = `${sl.path}/${sl.id}.vue`;
        process.env.VUE_APP_SL_ID = sl.id;
        console.log(`Building ${sl.id}`);

        await webpackBuild(api, sl);
        await assetsClean(sl);
        await screenMaker(sl);

    }

    await process.exit(0);
};