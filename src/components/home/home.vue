<template>
  <transition appear appear-active-class="home__effect-appear">
    <div class="home" :style="setVarCSS">
      <div class="home__selector">
        <router-link to="/selectStation" class="home__selector-link"></router-link>
      </div>
      <div class="home__menu">
        <router-link to="/selectStation" class="home__menu-link"></router-link>
      </div>
      <div class="home__player_block">
        <div class="home__player">
          <player :data="{ station }"/>
        </div>
      </div>
      <div class="home__playlist">
        <div class="home__playlist-button"></div>
      </div>
    </div>
  </transition>
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
      setVarCSS() {
        return {
          '--station-color-background': this.station.colorBackground,
          '--station-color-text': this.station.colorText,
        }
      }
    },
    mounted() {
      document.title = this.station.title
    }
  }
</script>
