import Vue from 'vue';
import Router from 'vue-router';
import { structure } from "@/clm.config";
import devPage from "@/dev-components/dev-page"

Vue.component("devPage", devPage);

Vue.use(Router);

const isDev = process.env.NODE_ENV === 'development';

function createRoutes(){
    const routes = [];
    let flow = 0;
    if(isDev){
        routes.push({
            path: '/',
            component: devPage
        });
    }

    structure.forEach((sl) => {
        if(sl.flowName){
            flow++;
        }
        let template = {};

        isDev ? template = {
            path: `/${sl.id}`,
            component: () => import(`@/slides/flow-${flow}/${sl.id}/${sl.id}.vue`),
        } :
        template = {
             path: `/`,
             component: () => import('@/slides/' + process.env.VUE_APP_SL_PATH),
        };
        routes.push(template)
    });

    return routes
}
export default new Router({
    mode: isDev ? 'history' : 'hash',
    routes: createRoutes(),
});
