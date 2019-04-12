import getSlideById from '@/dev-components/modules/utils/get-slide-by-id';

const getData = (path) => {
    const data = require(`../../../../slides/flow-1/${process.env.VUE_APP_SL_ID}/data/${process.env.VUE_APP_CLM_LANG}`);
    return data.default || data
};

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

        this.data = getData(this.slide.path);
        this.$store.commit('setCurrentSlide', this.slide);
        this.$store.commit('setCurrentData', this.data);
    },
}
