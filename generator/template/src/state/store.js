import Vue from 'vue';
import Vuex from 'vuex';
import { languages, structure } from '@/clm.config';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentSlide: {
            id: '',
            path: '',
            name: '',
        },
        structure: structure.map(sl => sl),
        languages,
        currentLang: languages[0],
        currentData: {
            content: {},
            popup: {}
        }
    },

    mutations: {
        setCurrentLang(state, lang){
            state.currentLang = lang;
        },
        setCurrentData: (state, data) => {
            state.currentData = data;
        },
        setCurrentSlide(state, slide){
            state.currentSlide = slide;
        }
    }
});

export default store
