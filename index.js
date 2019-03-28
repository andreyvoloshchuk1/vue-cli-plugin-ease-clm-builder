
const { hasYarn } = require('@vue/cli-shared-utils');
const pkgManager = hasYarn ? 'yarn' : 'npm';

const commands = {
   "git-init": {
        description: 'Link project with git repository',
        usage: `${pkgManager} git-init`,
        options: {

        },
    },
    generate: {
        description: 'Generate structure from clm.config',
        usage: `${pkgManager} generate`,
        options: {

        },
    },
    "build-clm": {
        description: 'Build project',
        usage: `${pkgManager} build`,
        options: {

        },
    }
};

module.exports = (api, projectOptions) => {
    if (!hasYarn) throw new Error(`You cannot using "npm" with this plugin.\nPlease install "yarn": https://yarnpkg.com`);

    for (let command in commands) {
        api.registerCommand(command, commands[command], args => {
            require(`./commands/${command}`)(api, projectOptions, args)
        });
    }
};

// make sure to specify the default mode for correct env variables
module.exports.defaultModes = {
    'build': 'production',
};