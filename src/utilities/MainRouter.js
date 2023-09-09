import {createRouter, createWebHistory} from "vue-router";

function route(name, path, componentFactory) {
    return {
        name: name,
        path: path,
        component: componentFactory
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        route(
            "signin", "/signin",
            () => import("#/sign-in.vue")
        ),
        route(
            "category","/cate",
            ()=>import("#/categories.vue")
        ),
        route(
            "search","/search",
            ()=>import("#/search.vue")
        ),
        route(
            "result","/result",
            ()=>import("#/result.vue")
        )
    ]
})



export default router