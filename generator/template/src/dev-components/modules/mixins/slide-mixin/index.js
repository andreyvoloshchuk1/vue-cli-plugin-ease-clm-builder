import getSlideById from '@/dev-components/modules/utils/get-slide-by-id';
import Store from '@/state/store'

const getData = (path) => {
    const lang = Store.state.currentLang;
    const data = require(`../../../../slides${path[0] === '/' ? path : '/' + path}/data/${lang}`);
    return data.default || data
};

const isDev = process.env.NODE_ENV === 'development';

export default {
    data() {
        return {
            slide: {},
            data: {
                content: {},
                popup: {},
            },
        }
    },
    computed: {
        t() {
            return this.data.content
        },
    },
    created() {
        let id;
        isDev ? id = this.$route.path.replace(/\//g, '') : id = process.env.VUE_APP_SL_ID;

        this.slide = { ...getSlideById(id) };

        this.data = getData(this.slide.path);
        this.$store.commit('setCurrentSlide', this.slide);
        this.$store.commit('setCurrentData', this.data);
    },
}