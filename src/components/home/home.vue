<template>
  <transition appear appear-active-class="home__effect-appear">
    <div class="home" :style="{ backgroundColor: station.colorBackground, color: station.colorText }">
      <div class="home__selector">
        <router-link v-bind:style="{ backgroundColor: station.colorText}"
                     to="/selectStation" class="home__selector-link"></router-link>
      </div>
      <div class="home__menu">
        <router-link v-bind:style="{ backgroundColor: station.colorText}"
                     to="/selectStation" class="home__menu-icon-link"></router-link>
      </div>
      <div class="home__player_block">
        <div class="home__player">
          <player :data="{ station }"/>
        </div>
      </div>
      <div class="home__playlist" :style="{backgroundColor: station.colorText}">
        <div class="home__playlist-button" :style="{ backgroundColor: station.colorBackground}"></div>
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
  }
</script>
