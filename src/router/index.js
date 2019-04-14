import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import selectStation from '../components/selectStation/selectStation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/selectStation',
      name: 'selectStation',
      component: selectStation,
    }
  ],
  mode: `history`,
})
