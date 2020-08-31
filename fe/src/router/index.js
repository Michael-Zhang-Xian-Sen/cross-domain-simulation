import { createRouter, createWebHistory } from 'vue-router'
import JsonpCrossOrigin from "@/components/cross_origin/JsonpCrossOrigin.vue";
import IframeCrossOrigin from "@/components/cross_origin/IframeCrossOrigin.vue";
import CorsCrossOrigin from "@/components/cross_origin/CorsCrossOrigin.vue";
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: 'jsonp-cross-origin',
                component: JsonpCrossOrigin
            },
            {
                path: "iframe-cross-origin",
                component: IframeCrossOrigin
            },
            {
                path: "cors-cross-origin",
                component: CorsCrossOrigin
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
