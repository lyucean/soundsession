<template>
  <div class="home" v-bind:style="{ background: station.colorBackground, color: station.colorText }">
    <div class="home__selector">
    <transition appear appear-active-class="home__selector-link-appear-active-class">
      <router-link to="/selectStation" class="home__selector-link">
        <svg class="home__selector-station-icon" width="30" height="30" viewBox="0 0 30 30" :fill="station.colorText" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
          d="M3 0C1.34315 0 0 1.34315 0 3V9C0 10.6569 1.34315 12 3 12H9C10.6569 12 12 10.6569 12 9V3C12 1.34315 10.6569 0 9 0H3ZM21 0C19.3431 0 18 1.34315 18 3V9C18 10.6569 19.3431 12 21 12H27C28.6569 12 30 10.6569 30 9V3C30 1.34315 28.6569 0 27 0H21ZM0 21C0 19.3431 1.34315 18 3 18H9C10.6569 18 12 19.3431 12 21V27C12 28.6569 10.6569 30 9 30H3C1.34315 30 0 28.6569 0 27V21ZM21 18C19.3431 18 18 19.3431 18 21V27C18 28.6569 19.3431 30 21 30H27C28.6569 30 30 28.6569 30 27V21C30 19.3431 28.6569 18 27 18H21Z"></path>
        </svg>
      </router-link>
    </transition>
    </div>
    <div class="home__menu">
      <svg class="home__menu-icon" width="39" height="10" viewBox="0 0 39 10" :fill="station.colorText" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.3">
              <ellipse cx="5.01429" cy="5" rx="5.01429" ry="5"/>
              <ellipse cx="19.5" cy="5" rx="5.01429" ry="5"/>
              <ellipse cx="33.9857" cy="5" rx="5.01429" ry="5"/>
          </g>
      </svg>
    </div>
    <div class="home__player_block">
      <div class="home__player">
        <player :data = "{ station }" />
      </div>
    </div>
    <transition appear appear-active-class="home__playlist-appear-active-class">
    <div class="home__playlist">
      <img class="home__playlist-icon" src="./play_list_closet.svg" alt>
    </div>
    </transition>
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
          station: stations.find( item => {
            if(this.$route.params.station === item.path){
              return item;
            }
          })
        }
      },
      components: {
        player
      },
    }
</script>
