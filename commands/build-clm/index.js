const miTouch = require("./mi-touch");
const buildConfig = require('./build-config');

module.exports = (api, options) => {
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

    miTouch();
};
