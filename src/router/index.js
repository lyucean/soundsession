import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/NotFound/NotFound.vue'
import home from '../components/home/home.vue'
import selectStation from '../components/selectStation/selectStation.vue'
import stations from '../data/stations.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
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
    { // это маршрут должен быть всгда в самом низу
      path: '/:station',
      name: 'home',
      component: home,
      beforeEnter: (to, from, next) => { // перед переходом, проверям, что такая станция существует
        if (stations.some(
          station => {
            return to.path === '/' + station.path
          }
        )){
          next()
        }else {
          next('/404')
        }
      }
    },
  ],
  mode: `history`,
})
