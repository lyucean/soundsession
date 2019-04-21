<template>
  <div class="home">
    <div class="home__selector">
      <router-link to="/selectStation">
        <img class="home__selector-station-icon" src="../../assets/selector_station_open.svg">
      </router-link>
    </div>
    <div class="home__menu">
      <img class="home__menu-icon" src="../../assets/menu_icon.svg"/>
    </div>
    <div class="home__player_block">
      <div class="home__player">
        <player/>
      </div>
    </div>
    <transition appear appear-active-class="home__playlist-appear-active-class">
    <div class="home__playlist">
      <img class="home__playlist-icon" src="../../assets/play_list_closet.svg">
    </div>
    </transition>
  </div>
</template>

<style src="./home.css" scoped></style>

<script>

    import player from '../player/player.vue'

    export default {
      name: 'home',
      data () {
        return {
          title: 'All sound'
        }
      },
      components: {
        player
      }
    }
</script>
