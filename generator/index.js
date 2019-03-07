const fs = require('fs');
const fse = require('fs-extra');

module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        scripts: {
            "git-init": 'vue-cli-service git-init',
            'dev': "node --max_old_space_size=4096 node_modules/@vue/cli-service/bin/vue-cli-service serve",
            "generate": "vue-cli-service generate",
            'build': "vue-cli-service build-clm"
        },
        dependencies: {
            'veevalibrary': '^4.0.8',
            'vue2-touch-events': '^1.1.2',
            'vue-router': '^3.0.2',
            'vuex': '^3.0.1',
            "vuetify": "^1.5.4",
            "material-design-icons-iconfont": "^4.0.5",
        },
        devDependencies: {
            '@vue/cli-plugin-babel': '^3.4.1',
            'node-sass': '^4.11.0',
            'sass-loader': '^7.1.0',
            'vue-svg-loader': '^0.12.0',
            'qrcode-generator': '^1.4.3',
            "stylus": "^0.54.5",
            "stylus-loader": "^3.0.1",
            "vue-cli-plugin-vuetify": "^0.4.6",
            "vuetify-loader": "^1.0.5"
        }
    });

    api.render("./template");

    api.onCreateComplete(() => {
        const toDelete = [
            'public/favicon.ico',
            'src/assets/logo.png',
            'src/components/HelloWorld.vue',
            'src/views',
            'src/router.js',
            'src/store.js',
        ];

        toDelete.forEach(relativePath => {
            const fullPath = api.resolve(relativePath);

            if (fs.existsSync(fullPath)) {
                fse.removeSync(fullPath);
            }
        });
    });
};