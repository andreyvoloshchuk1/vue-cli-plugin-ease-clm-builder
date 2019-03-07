const { hasGit } = require("@vue/cli-shared-utils");
const {done, error} = require("@vue/cli-shared-utils");
const { exec } = require('child_process');

module.exports = (api, options, rootOptions) => {
    if (!hasGit){
        console.log(error("Please install Git"))
    }
    else {
        console.log(done("Git is instaled. Let's go"));
        const cwd = api.getCwd();
        let count = 0;
        const projectName = cwd.split('').reverse().filter((char) => {
            if (char === '\\'){count++}
            return !count;
        }).reverse().join('');

        const serve = exec(`git init && git remote add origin master git@elevenfloor.com:${projectName}.git`);
        // const serve = exec(`git init`);
        serve.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
    }
};