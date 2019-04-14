<template>
  <div class="home">
    <div class="home__selector">
      <router-link to="/selectStation">
        <img class="home__selector-station-icon" src="../../assets/selector_station_icon.svg">
      </router-link>
    </div>
    <div class="home__menu">
      <img class="home__menu-icon" src="../../assets/menu_icon.svg">
    </div>
    <div class="home__player">
      <h1>{{ title }}</h1>
    </div>
    <div class="home__playlist">
    </div>
  </div>
</template>
<script src="./Home.js"></script>
<style src="./Home.css" scoped></style>
