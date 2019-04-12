<template>
   <div id="container"></div>
</template>

<script>
    import { mapState, mapMutations } from "vuex";
    import { getLocalIP } from "@/dev-components/modules/utils/get-system-info"
    import qrCodeGenerator from 'qrcode-generator'

    export default {
        data: () => {
            return {
                openMenu: true,

                externalData: {
                    qr: '',
                    link: '',
                },
            }
        },

        methods: {
            ...mapMutations(["setCurrentLang"]),
            changeLang(key){
                this.setCurrentLang(this.languages[key])
            },

            copyTextToClipboard() {
                const copyText = document.getElementById('external-link');
                const tooltip = document.getElementById("myTooltip");

                copyText.select();
                document.execCommand("Copy");
                tooltip.innerHTML = "Copied: " + copyText.value;
            },

            resetTooltip() {
                const tooltip = document.getElementById("myTooltip");
                tooltip.innerHTML = "Copy to clipboard";
            },
        },

        computed: {
            ...mapState(["structure", "currentLang", "languages"]),
        },

        created(){
            getLocalIP().then(ip => {
                const port = /\:\d{4,6}/.exec(window.location.href); //=> :8080
                const externalHref = `http://${ip}${port}`;
                const typeNumber = 0;
                const errorCorrectionLevel = 'L';
                const qr = qrCodeGenerator(typeNumber, errorCorrectionLevel);

                qr.addData(externalHref);
                qr.make();
                this.externalData.qr = qr.createSvgTag(20);
                this.externalData.link = externalHref;
            });
        }
    }
</script>

<style lang="scss">
    $material-design-icons-font-path: '~material-design-icons-iconfont/dist/fonts/';
    @import '~material-design-icons-iconfont/src/material-design-icons';

    .nav-menu {
        position: absolute;
        right: -300px;
        left: auto;
        top: 64px;
        bottom: 0;

        height: auto;
    }
    .qr-btn {
        width: 80px;
        height: 80px;

        border-radius: 10px;
    }

    .v-overlay {
        right: auto;
        bottom: auto;
        position: absolute;

        width: 100%;
        height: 100%;
    }

    .v-dialog__content {
        position: absolute;
    }

    .external-data-qr-code {
        width: 500px;

        /deep/ svg {
            margin: 0 auto;
            width: 100%;
            height: auto;
        }
    }
</style>
