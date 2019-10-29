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
      redirect: '/select' // по умолчанию запускаем выбор станции
    },
    {
      path: '/selectStation', // т.к. сменил переменную, редиректим первое время
      redirect: '/select'
    },
    {
      path: '/select',
      name: 'select',
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
