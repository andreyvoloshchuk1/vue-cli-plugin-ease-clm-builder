const path = require('path');
const root = process.cwd();
const fs = require("fs");
const fse = require("fs-extra");

const clmConfig = path.join(root, 'src', 'clm.config');
const src = path.join(root, 'src');
const { structure, languages } = require(clmConfig);

module.exports = (api, options, rootOptions) => {
    if (!fs.existsSync('./src/slides')){
        fs.mkdirSync('./src/slides')
    }

    let flow = 0;

    for (let i in structure){
        if (structure[i].flowName){
            flow++;
            if (!fs.existsSync(`./src/slides/flow-${flow}`)){
                fs.mkdirSync(`./src/slides/flow-${flow}`);
            }
        }

        if (!fs.existsSync(`./src/slides/flow-${flow}/${structure[i].id}`)){
            fs.mkdirSync(`./src/slides/flow-${flow}/${structure[i].id}`);
        }

        if (!fs.existsSync(`./src/slides/flow-${flow}/${structure[i].id}/assets`)){
            fs.mkdirSync(`./src/slides/flow-${flow}/${structure[i].id}/assets`);
        }

        const slideTemplate = path.resolve(__dirname, "template/slide-template.vue");
        const slide = path.join(root, 'src', 'slides', `flow-${flow}`, `${structure[i].id}`, `${structure[i].id}.vue`);
        if (!fs.existsSync(slide)){
            fse.copySync(slideTemplate, slide);
        }

        if (Array.isArray(languages)){
            if (!fs.existsSync(`./src/slides/flow-${flow}/${structure[i].id}/data`)){
                fs.mkdirSync(`./src/slides/flow-${flow}/${structure[i].id}/data`);
            }

            languages.forEach((item) => {
                if (!fs.existsSync(`./src/slides/flow-${flow}/${structure[i].id}/data/${item}`)){
                    fs.mkdirSync(`./src/slides/flow-${flow}/${structure[i].id}/data/${item}`);
                }

                const dataTemplate = path.resolve(__dirname, "template/data-template.js");
                const data = path.join(root, 'src', 'slides', `flow-${flow}`, `${structure[i].id}`, 'data', `${item}`,`index.js`);
                if (!fs.existsSync(data)){
                    fse.copySync(dataTemplate, data);
                }
            })
        }
        else {
            console.log('languages in clm.config must be array');
        }
    }
};