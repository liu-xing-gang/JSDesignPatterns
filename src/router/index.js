import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import HelloWorld from '@/components/HelloWorld'
import JSpattern from '@/pages/JSpattern'

Vue.use(Router)

export default new Router({
    hashbang: false,
    mode: 'hash',
    routes: [{
            path: '*',
            redirect: '/index'
        },
        {
            path: '/',
            name: '',
            component: Index
        },
        {
            path: '/hello',
            name: 'hello',
            component: HelloWorld
        },
        {
            path: '/jspattern',
            name: 'jspattern',
            component: JSpattern
        }
    ]
})