const miTouch = require("./mi-touch");
const buildConfig = require('./build-config');
const path = require('path');
const root = process.cwd();
const clmConfig = path.join(root, 'src', 'clm.config');

module.exports = (api, options) => {
    process.env.NODE_ENV = 'production';

    function validatePrompt(){
        const args = process.argv.slice(1);

        if (!args.length){
            console.log("Please, set CLM type for build");
            process.exit(1);
            return
        }

        args.forEach((arg, i, arr) => {
            if (arg.search(/-/) === 0){
                (/-/.test(arr[i + 1]) || arr[i + 1] === undefined) ? buildConfig[arg.replace('-', '')] = true : buildConfig[arg.replace('-', '')] = arr[i + 1];
            }
        });

        if (!buildConfig["c"] && !buildConfig["clm"]){
            console.log("Please, set CLM type for build");
            process.exit(1);
            return
        }
    };

    function globalVariables(){
        process.env.VUE_APP_CLM = buildConfig["c"] || buildConfig["clm"];
        process.env.VUE_APP_SLIDES_TO_BUILD = buildConfig["f"] || buildConfig["filter"] || "all";
        process.env.VUE_APP_CLM_CONFIG = clmConfig;
        process.env.VUE_APP_CLM_LANG = "ua";
        process.env.VUE_APP_CLM_SRC = path.join(root, 'src');
        process.env.VUE_APP_CLM_GLOBAL = path.join(root, 'src', 'global');
    };

    validatePrompt();
    globalVariables();
    miTouch(api);

};
