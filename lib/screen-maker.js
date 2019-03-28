const root = process.cwd();
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const Nightmare = require('nightmare');
const { clm } = require(path.join(root, 'src', 'clm.config'));


const nightmare = new Nightmare({
    useContentSize: true,
    enableLargerThanScreen: true,
    width: clm.device.resolution.width,
    height: clm.device.resolution.height,
    show: false,
    frame: false,
    webPreferences: {
        webaudio: false,
        webSecurity: false,
    },
});

module.exports = (sl) => {
    return new Promise((res, rej) => {
        const url = `file:///${process.env.VUE_APP_OUT_DIR_PATH}/index.html`;
        const screenName = `${sl.id}.png`;
        fse.ensureDir(path.join(root, 'dist', 'screens', `${process.env.VUE_APP_CLM}`, `${process.env.VUE_APP_CLM_LANG}`));
        fse.ensureDir(path.join(root, 'dist', 'screens', `${process.env.VUE_APP_CLM}`, `${process.env.VUE_APP_CLM_LANG}`, `${sl.id}`));


         nightmare
            .goto(url)
             .evaluate(function() {
                 var s = document.styleSheets[0];
                 s.insertRule('::-webkit-scrollbar { display:none; }');
             })
            .screenshot()
            .then(buffer => {
                fs.writeFileSync(path.join('dist', 'screens', `${process.env.VUE_APP_CLM}`, `${process.env.VUE_APP_CLM_LANG}`, `${sl.id}`,`${screenName}`), buffer);
                res();
            })
            .catch(err => rej(err));

    })
};