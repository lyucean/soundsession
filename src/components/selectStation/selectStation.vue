<template>
  <div class="select-station">
    <div class="select-station__close">
      <router-link to="/">
        <img class="select-station__close-icon" src="../../assets/selector_station_close.svg">
        </router-link>
    </div>
      <transition-group class="select-station__grid"
                        appear
                        appear-to-class="station_link-appear-to-class"
                        appear-active-class="station_link-appear-active-class"
                        tag="div">
          <div class="station" v-for="(station, index) in myStations"
               v-bind:key="index"
               v-bind:data-index="index"
               v-bind:style="{ background: station.colorBackground, 'transition-delay': index * 50 + 'ms' }">
          <router-link to="/" class="station_link">
            <div class="station_wrap"
                 v-bind:style="{ color: station.colorText}">
              <div class="station__title">{{station.title}}</div>
              <div class="station__genres">{{station.genres}}</div>
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
  el: 'select-station',
  name: 'selectStation',
  data () {
    return {
      myStations: stations
    }
  },
}
</script>