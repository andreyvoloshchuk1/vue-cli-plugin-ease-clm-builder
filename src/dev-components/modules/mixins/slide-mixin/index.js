import getSlideById from '@/dev-components/modules/utils/get-slide-by-id';
import Store from '@/state/store'

const getData = (path) => {
    const lang = Store.state.currentLang;
    const data = require(`../../../../slides${path[0] === '/' ? path : '/' + path}/data/${lang}`);
    return data.default || data
};

// const isDev = process.env.NODE_ENV === 'development';

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
        const id = this.$route.path.replace(/\//g, '');

        this.slide = { ...getSlideById(id) };
        /**
         * Import text data for current slide
         * Slides data must contain in 'src/data/[lang]/[slide.path].js'
         */
        this.data = getData(this.slide.path);
        this.$store.commit('setCurrentSlide', this.slide);
        this.$store.commit('setCurrentData', this.data);
    },
}
