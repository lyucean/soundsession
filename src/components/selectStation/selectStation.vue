<template>
  <div :style="setVarCSS" class="select-station">
    <div class="select-station__close">
      <router-link
        :to="linkBack"
        class="select-station__close-link">
        <img class="select-station__close-icon"
             alt="Button Back"
             src="./selector_station_close.svg">
      </router-link>
    </div>

    <transition-group class="select-station__grid" v-bind:class="{ hover_effect: hoverEffectIsActive  }" tag="div">
      <div class="station" v-for="item in items" v-bind:key="item.title"
           v-bind:style="{ background: item.colorBackground, opacity: item.opacity }">
        <router-link :to="item.path" class="station__link">
          <div class="station_wrap" v-bind:style="{color: item.colorText}">
            <div class="station__title">{{item.title}}</div>
            <div class="station__genres">{{item.genres}}</div>
          </div>
        </router-link>
      </div>
    </transition-group>

  </div>
</template>

<style src="./selectStation.css" scoped></style>

<script>
  import stations from '../../data/stations.js'

  export default {
    name: 'selectStation.vue',
    data () {
      return {
        items: stations.map(function (el) {
          // нам нужно добавить свойство прозарчности в массв для каждого элемента
          el['opacity'] = 0
          return el
        }),
        appear_delay: 50, // время задержки перед появлением/исчезновением каждого элемента
        hoverEffectIsActive: false,
        linkBack: '/all', // на всякий по умолчанию /all
        realHeight: document.documentElement.clientHeight,
      }
    },
    mounted: function () {
      // смени заголовок
      document.title = 'Choose your mood :)'

      // анимация разворачивания списков
      this.items.forEach(function (item, i) {
        setTimeout(() => item.opacity = 1, this.appear_delay * i)
      }, this)

      // включение эффекта наведения на станцию
      this.hoverEffectIsActive = true

      // добавим событие на поворот экрана
      window.addEventListener('resize', this.recalculateHeight, false)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.recalculateHeight)
    },
    beforeRouteLeave (to, from, next) {

      // выключение эффекта наведения на станцию
      this.hoverEffectIsActive = false

      // эффект постепенного исчезновения
      this.items.forEach(function (item, i, items) {
        setTimeout(function () {
          item.opacity = 0

          // после послднего переходим на страницу
          if (i === items.length - 1) {
            next()
          }
        }, this.appear_delay * i)
      }, this)

    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // Если это первый запуск, тогда кнопка назад это /all
        if (from.path !== '/') {
          vm.linkBack = from.path
        } else {
          vm.linkBack = '/all'
        }
      })
    },
    methods: {
      // Пробросим собыите срабатывания мыши
      recalculateHeight () {
        // пересчитаем высоту экрана, window.outerHeight не работает
        this.realHeight = document.documentElement.clientHeight // изменим высотку экрана
      }
    },
    computed: {
      setVarCSS () {
        return {
          '--real_height': this.realHeight + 'px', // нужно, чтоб подогнать высоту на мобильника и не было полосы прокутки
        }
      }
    },
  }
</script>
