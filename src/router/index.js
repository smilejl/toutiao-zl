import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path:'/login',
        name:'login',
        component: () => import('@/view/login/')
    },
    {
        path:'/',
        component: () => import('@/view/layout/'),
        children:[
            
            {
                path:'',
                name:'home',
                component: () => import('@/view/home/')
            },
            {
                path:'/qa',
                name:'qa',
                component: () => import('@/view/qa/'),
            },
            {
                path:'/vidoe',
                name:'vidoe',
                component: () => import('@/view/vidoe/'),
            },
            {
                path:'/my',
                name:'my',
                component: () => import('@/view/my/'),
            }
        ]
    },
    {
        path:'/search',
        name:'search',
        component: () => import('@/view/search')
    },
    {
        path:'/article/:articleId',
        name:'article',
        component: () => import('@/view/article/'),
        props:true
    }
]

const router = new VueRouter({
    routes
})

export default router