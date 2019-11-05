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
        metaImage: window.location.origin + '/static/social/social_' + this.$route.params.station + '.jpg',
      }
    },
    metaInfo () {
      // метатеги страницы
      return {
        title: this.station.metaDescription,
        link: [
          { rel: 'image_src', href: this.metaImage }
        ],
        meta: [
          { name: 'description', content: this.station.genres },
          { name: 'keywords', content: this.station.metaDescription },

          { property: 'url', content: window.location.href },
          { property: 'name', content: this.station.title },
          { property: 'description', content: this.station.genres },
          { property: 'image', content: this.metaImage },

          { property: 'url', content: window.location.href },
          { property: 'name', content: this.station.title },
          { property: 'description', content: this.station.genres },
          { property: 'image', content: this.metaImage },

          { property: 'og:url', content: window.location.href },
          { property: 'og:type', content: 'music.radio_station' },
          { property: 'og:title', content: this.station.title },
          { property: 'og:description', content: this.station.genres },
          { property: 'og:image', content: this.metaImage },
          { property: 'og:image:secure_url', content: this.metaImage },

          { property: 'twitter:title', content: this.station.title },
          { property: 'twitter:description', content: this.station.genres },
          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:site', content: window.location.href },
          { property: 'twitter:image', content: this.metaImage },

          { property: 'vk:image', content: this.metaImage },

          { name: 'theme-color', content: this.station.colorBackground },
        ]
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
        if (event.deltaY < 0) {
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
