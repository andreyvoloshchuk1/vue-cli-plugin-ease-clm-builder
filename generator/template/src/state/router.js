import Vue from 'vue';
import Router from 'vue-router';
import { structure } from "@/clm.config";
import devPage from "@/dev-components/dev-page"

Vue.component("devPage", devPage);

Vue.use(Router);

function createRoutes(){
    const routes = [];
    let flow = 0;
    routes.push({
        path: '/',
        component: devPage
    });
    structure.forEach((sl) => {
        if(sl.flowName){
            flow++;
        }
        const template = {
            path: `/${sl.id}`,
            component: () => import(`@/slides/flow-${flow}/${sl.id}/${sl.id}.vue`),
        };
        routes.push(template)
    });

    return routes
}
export default new Router({
    routes: createRoutes(),
});
