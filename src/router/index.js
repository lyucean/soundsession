import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'
import selectStation from '../components/selectStation/selectStation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/selectStation',
      name: 'selectStation',
      component: selectStation,
    }
  ],
  mode: `history`,
})
