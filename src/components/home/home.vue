<template>
    <div class="home" :style="setVarCSS" @mousemove="onMouseMove">
      <div class="home__selector">
        <router-link to="/selectStation" class="home__selector-link"></router-link>
      </div>
<!--      <div class="home__menu">-->
<!--        <router-link to="/selectStation" class="home__menu-link"></router-link>-->
<!--      </div>-->
      <div class="home__player_block">
        <div class="home__player">
          <player :data="{ station }"/>
        </div>
      </div>
      <router-link to="/selectStation" class="home__playlist-link">
        <div class="home__playlist-button"></div>
      </router-link>
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
      }
    },
    components: {
      player
    },
    computed: {
      setVarCSS () {

        // смени цвет плейлиста
        let colorPlaylistBackground = this.station.colorBackground;

        // если задан отдельный цвет кнопки, применим
        if (typeof this.station.colorPlaylistButton !== 'undefined') {
          colorPlaylistBackground = this.station.colorPlaylistButton
        }

        return {
          '--background-color': this.station.colorBackground,
          '--text-color': this.station.colorText,
          '--playlist-button-color': colorPlaylistBackground,
          '--real_height': window.outerHeight + 'px', // нужно, чтоб подогнать высоту на мобильника и не было полосы прокутки
        }
      }
    },
    mounted () {
      document.title = this.station.title
    },
    methods: {
      // Пробросим собыите срабатывания мыши
      onMouseMove() {
        this.$emit('onMouseMove');
      }
    }
  }
</script>
