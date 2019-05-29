import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/NotFound/NotFound.vue'
import home from '../components/home/home.vue'
import selectStation from '../components/selectStation/selectStation.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/all' // редирект на All sound с главной
    },
    {
      path: '/selectStation',
      name: 'selectStation',
      component: selectStation,
    },
    { // 404
      path: '/404',
      name: '404',
      component: NotFound,
    },
  ],
  mode: `history`,
})
