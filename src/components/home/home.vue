<template>
  <div :style="setVarCSS"
       @mousemove="onMouseMove"
       @mousewheel="onMouseWheel"
       @orientationchange="setVarCSS" class="home">
    <div class="home__selector">
      <router-link class="home__selector-link" to="/select"></router-link>
    </div>
    <!--      <div class="home__menu">-->
    <!--        <router-link to="/selectStation" class="home__menu-link"></router-link>-->
    <!--      </div>-->
    <div class="home__player_block">
      <div class="home__player">
        <player :data="{ station }"/>
      </div>
    </div>
    <!--    <router-link class="home__playlist-link" to="/select">-->
    <!--      <div class="home__playlist-button"></div>-->
    <!--    </router-link>-->
  </div>
</template>

<style src="./home.css" scoped></style>

<script>
  import player from '../player/player.vue'
  import stations from '../../data/stations.js'

  export default {
    name: 'home',
    data () {
      return {
        station: stations.find(item => {
          if (this.$route.params.station === item.path) {
            return item
          }
        }),
        realHeight: document.documentElement.clientHeight,
      }
    },
    components: {
      player
    },
    computed: {
      setVarCSS () {

        // смени цвет плейлиста
        let colorPlaylistBackground = this.station.colorBackground

        // если задан отдельный цвет кнопки, применим
        if (typeof this.station.colorPlaylistButton !== 'undefined') {
          colorPlaylistBackground = this.station.colorPlaylistButton
        }

        return {
          '--background-color': this.station.colorBackground,
          '--text-color': this.station.colorText,
          '--playlist-button-color': colorPlaylistBackground,
          '--real_height': this.realHeight + 'px', // нужно, чтоб подогнать высоту на мобильника и не было полосы прокутки
        }
      }
    },
    mounted () {
      // смени заголовок на станцию
      document.title = this.station.title

      // добавим событие на поворот экрана
      window.addEventListener('resize', this.recalculateHeight, false)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.recalculateHeight)
    },
    methods: {
      // Пробросим собыите срабатывания мыши
      onMouseMove () {
        this.$emit('onMouseMove')
      },
      onMouseWheel (event) {
        if (0 < event.deltaY) {
          this.$emit('volumeUp')
        } else {
          this.$emit('volumeDown')
        }
        this.$emit('onMouseMove')
      },
      // Пробросим собыите срабатывания мыши
      recalculateHeight () {
        this.realHeight = window.outerHeight // изменим высотку экрана
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // если это не первая загрузка страницы, а переход, то запустим плеер, если он не запщен
        if (from.path !== '/') {
          // Пробросим собыите запустить плеер
          vm.$emit('play')
        }
      })
    },
  }
</script>
