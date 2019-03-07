<template>
    <v-container fluid class="indigo lighten-4 pa-0">
        <div class="nav" flat app>
            <v-toolbar class="indigo lighten-3" dark>
                <v-toolbar-title>
                    Ease-CLM-builder
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-side-icon @click="openMenu = !openMenu"></v-toolbar-side-icon>
            </v-toolbar>
        </div>

        <v-container>
            <v-layout column px-20>
                <v-card v-for="(slide, key) in structure" class="my-2" :key="`item_${key}`" @click="$router.push(`/${slide.id}`)" dark color="indigo">
                    <v-card-text class="py-2">
                        <span class="mr-5">{{slide.id}}</span>
                        <span class="mr-5">{{slide.name[currentLang]}}</span>
                        <span class="mr-5" v-if="slide.flowName">{{slide.flowName[currentLang]}}</span>
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-container>
        <v-navigation-drawer v-model="openMenu" class="indigo lighten-2 nav-menu">
            <v-container>
                <v-layout justify-center>
                    <v-dialog max-width="600px">
                        <v-btn slot="activator" full-width color="white qr-btn">
                            <v-icon size="60">developer_board</v-icon>
                        </v-btn>
                        <v-card>
                            <v-container class="external-data-qr-code" v-html="externalData.qr"></v-container>

                            <v-container>
                                <div class="external-data-link" @mouseleave="resetTooltip">
                                    <input id="external-link" v-model="externalData.link"/>
                                    <div class="btn icon-external-data-copy" @click="copyTextToClipboard">
                                        <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                                    </div>
                                </div>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </v-layout>
                <v-layout class="pa-0" justify-space-between="true">
                    <v-btn v-for="(value, key) in languages" v-html="value" :key="`lang_${key}`" @click="changeLang(key)" color="indigo" dark></v-btn>
                </v-layout>
            </v-container>
        </v-navigation-drawer>
    </v-container>
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
